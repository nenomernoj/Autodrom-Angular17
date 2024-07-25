import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.authService.getToken();

    if (token) {
      authReq = this.addTokenHeader(req, token);
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Token might be expired, try refreshing it
          return this.authService.refreshToken().pipe(
            switchMap((response: { accessToken: string, refreshToken: string }) => {
              authReq = this.addTokenHeader(req, response.accessToken);
              return next.handle(authReq);
            }),
            catchError((err) => {
              // Redirect to login page or handle appropriately
              this.authService.logout();
              return throwError(err);
            })
          );
        }

        return throwError(error);
      })
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + token)
    });
  }
}
