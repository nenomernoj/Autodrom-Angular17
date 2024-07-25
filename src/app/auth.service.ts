import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {map, Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly ACCESS_TOKEN_KEY = 'accessToken';
  private readonly REFRESH_TOKEN_KEY = 'refreshToken';

  constructor(private http: HttpClient) {
  }

  getToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
  }

  refreshToken(): Observable<{ accessToken: string, refreshToken: string }> {
    const refreshToken = this.getRefreshToken();
    return this.http.post<{ accessToken: string, refreshToken: string }>('/api/account/refresh', { refreshToken }).pipe(
      tap(response => {
        if (response && response.accessToken && response.refreshToken) {
          this.setTokens(response.accessToken, response.refreshToken);
        }
      }),
      map(response => ({ accessToken: response.accessToken, refreshToken: response.refreshToken }))
    );
  }

  register(data: any): Observable<HttpResponse<any>> {
    return this.http.post(`/api/account/register`, data, {
      observe: 'response'
    });
  }

  login(data: any): Observable<any> {
    return this.http.post<any>('/api/account/login', data).pipe(
      tap(response => {
        if (response && response.accessToken && response.refreshToken) {
          this.setTokens(response.accessToken, response.refreshToken);
        }
      })
    );
  }

  resetPassword(data: any): Observable<HttpResponse<any>> {
    const params = {
      login: data.login
    }
    return this.http.post(`/api/account/resetpassword`, data, {
      observe: 'response',
      params: params
    },);
  }

  logout(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    // Redirect to login page or handle logout
  }
}
