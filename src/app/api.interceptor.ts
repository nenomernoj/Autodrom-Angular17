import {Injectable} from '@angular/core';
import {Observable, throwError, BehaviorSubject} from 'rxjs';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
  HttpHeaders, HttpClient
} from '@angular/common/http';
import {Router} from '@angular/router';
import {catchError, switchMap, filter, take} from 'rxjs/operators';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {TokenService} from './token.service';

@Injectable()
export class ParamInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private router: Router,
              private http: HttpClient,
              private notif: NzNotificationService,
              private tokenService: TokenService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(request);
    if (
      request.url.startsWith('/api/account/register') ||
      request.url.startsWith('/api/account/login') ||
      request.url.startsWith('/api/account/resetpassword')
    ) {
      return next.handle(request).pipe(
        catchError(error => {
          console.log(error);
          this.notif.error('Ошибка', error.error.message);
          return throwError(error);
        })
      );
    } else {
      const access_token = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      let token = '';
      if (request.url.startsWith('/api/account/refresh')) {
        token = refreshToken ? `Bearer ` + refreshToken : '';
      } else {
        token = access_token ? `Bearer ` + access_token : '';
      }

      const modifiedReq = request.clone({
        headers: request.headers.set('Authorization', token),
      });
      return next.handle(modifiedReq).pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            if (!this.isRefreshing) {
              this.isRefreshing = true;
              this.refreshTokenSubject.next(null);
              return this.refreshToken().pipe(
                switchMap((data: any) => {
                  this.isRefreshing = false;
                  localStorage.setItem('accessToken', data.accessToken);
                  this.refreshTokenSubject.next(data.accessToken);
                  const newToken = `Bearer ` + data.accessToken;
                  const newRequest = request.clone({
                    headers: request.headers.set('Authorization', newToken),
                  });
                  return next.handle(newRequest);
                }),
                catchError(refreshError => {
                  this.isRefreshing = false;
                  this.notif.error('Ошибка', refreshError.error.message);
                  this.router.navigate(['/login']);
                  return throwError(refreshError);
                })
              );
            } else {
              return this.refreshTokenSubject.pipe(
                filter(token => token != null),
                take(1),
                switchMap(token => {
                  const newRequest = request.clone({
                    headers: request.headers.set('Authorization', `Bearer ` + token),
                  });
                  return next.handle(newRequest);
                })
              );
            }
          } else {
            this.notif.error('Ошибка', error.error.message);
            return throwError(error);
          }
        })
      );
    }
  }

  refreshToken(): Observable<any> {
    return this.http.post<any>('/api/account/refresh', {});
  }
}
