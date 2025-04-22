import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IListModel } from '../../../shared/interfaces/list.model';
import { ICustomerResponseModel } from '../interfaces/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private _http: HttpClient) {}

  customers(
    params: HttpParams,
  ): Observable<IListModel<ICustomerResponseModel>> {
    return this._http.get<IListModel<ICustomerResponseModel>>('api/Customers', {
      params: params,
    });
  }

  customer(id: number) {
    return this._http.get<ICustomerResponseModel>(`api/Customers/${id}`);
  }
}
