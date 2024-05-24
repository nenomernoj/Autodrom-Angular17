import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {NzNotificationService} from "ng-zorro-antd/notification";

@Injectable()
export class ParamInterceptor implements HttpInterceptor {
  constructor(private router: Router,
              private notif: NzNotificationService) {
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
      const access_token = localStorage.getItem('ACCESS_TOKEN');
      let token = '';
      token = access_token ? `Bearer ` + access_token : '';
      const modifiedReq = request.clone({
        headers: request.headers.set('Authorization', token),
      });
      return next.handle(modifiedReq).pipe(catchError(error => {
          this.notif.error('Ошибка', error.error.message);
          return throwError(error);
        })
      );
    }
  }

  errorAuth(): void {
    /*    this.msg.error('Ошибка авторизации', 'Ваша сессия истекла');*/
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('SELECTED_COMPANY');
    localStorage.removeItem('USERS_COMPANYS');
    localStorage.removeItem('AUTH_METHOD');
    localStorage.removeItem('SELECTED_COMPANY_BIN');
    this.router.navigate(['/']);
  }
}
