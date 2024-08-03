import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private refreshTokenUrl = '/api/account/refresh';

  constructor(private http: HttpClient) {}


}
