import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PortalService {

  constructor(private http: HttpClient) {
  }

  getOrgsList(): Observable<HttpResponse<any>> {
    const data = {
      pageIndex: 0,
      pageSize: 10,
    }
    return this.http.post(`/api/organization/getorganizationlist`, data, {
      observe: 'response'
    });
  }
}
