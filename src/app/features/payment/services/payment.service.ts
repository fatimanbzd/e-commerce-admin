import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IListModel } from '@core/interfaces/list.model';
import { IBillResponseModel } from '../interfaces/bill-response.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  bills(params: HttpParams): Observable<IListModel<IBillResponseModel>> {
    return this.http.get<IListModel<IBillResponseModel>>(
      'api/Report/ListOfBill',
      { params: params },
    );
  }

  export(params?: HttpParams) {
    return this.http.get('api/Report/ListOfBill/excel', { params: params });
  }
}
