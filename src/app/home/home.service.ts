import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) {

  }

  register(data: any): Observable<HttpResponse<any>> {
    return this.http.post(`/api/account/register`, data, {
      observe: 'response'
    });
  }
  login(data: any): Observable<HttpResponse<any>> {
    return this.http.post(`/api/account/login`, data, {
      observe: 'response'
    });
  }
  resetPassword(data: any): Observable<HttpResponse<any>> {
    const params = {
      login:  data.login
    }
    return this.http.post(`/api/account/resetpassword`, data, {
      observe: 'response',
      params: params
    },);
  }
}
