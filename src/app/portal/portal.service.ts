import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
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
      pageSize: 999,
    }
    return this.http.post(`/api/organization/getorganizationlist`, data, {
      observe: 'response'
    });
  }

  addOrg(data: any): Observable<HttpResponse<any>> {
    return this.http.post(`/api/organization/create`, data, {
      observe: 'response'
    });
  }

  editOrg(data: any): Observable<HttpResponse<any>> {
    return this.http.post(`/api/organization/update`, data, {
      observe: 'response'
    });
  }

  getExamsList(): Observable<HttpResponse<any>> {
    return this.http.get(`/api/examine/list`, {
      observe: 'response'
    });
  }

  getLessonsByExam(id: string): Observable<HttpResponse<any>> {
    return this.http.get(`/api/lesson/list?examineId=${id}`, {
      observe: 'response'
    });
  }

  updateOrderListByExam(data: any): Observable<HttpResponse<any>> {
    return this.http.post(`/api/lesson/update`, data, {
      observe: 'response'
    });
  }

  getTaskListByLessonId(id: string): Observable<HttpResponse<any>> {
    return this.http.get(`/api/task/gettasksbylesson?lessonId=${id}`, {
      observe: 'response'
    });
  }
  updateTaskList(data: any): Observable<HttpResponse<any>> {
    return this.http.post(`/api/task/updatetaskerror`, data, {
      observe: 'response'
    });
  }
  getVehicleList(): Observable<HttpResponse<any>> {
    const data = {
      pageIndex: 0,
      pageSize: 999,
    }
    return this.http.post(`/api/vehicle/getvehiclelist`, data, {
      observe: 'response'
    });
  }
  addVenicle(data: any): Observable<HttpResponse<any>> {
    return this.http.post(`/api/vehicle/create`, data, {
      observe: 'response'
    });
  }
  updateVenicle(data: any): Observable<HttpResponse<any>> {
    return this.http.post(`/api/vehicle/update`, data, {
      observe: 'response'
    });
  }
  deleteVenicle(data: any): Observable<HttpResponse<any>> {
    return this.http.post(`/api/vehicle/delete`, data, {
      observe: 'response'
    });
  }
}
