import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IVendorResponseModel } from '../interfaces/vendor-response.model';
import { IVendorDetailModel } from '../interfaces/vendor-detail.model';
import { IFinancialDownloadFileResponseModel } from '../../vendor/interfaces/vendor-financial.model';
import {IListModel} from '../../../shared/interfaces/list.model';

@Injectable({
  providedIn: 'root',
})
export class VendorService {
  constructor(private http: HttpClient) {}

  vendors(params: HttpParams): Observable<IListModel<IVendorResponseModel>> {
    return this.http.get<IListModel<IVendorResponseModel>>(
      'api/VendorManagements',
      { params: params },
    );
  }

  vendor(id: number): Observable<IVendorDetailModel> {
    return this.http.get<IVendorDetailModel>(`api/VendorManagements/${id}`);
  }

  accept(vendorId: number): Observable<void> {
    return this.http.put<void>(`api/VendorManagements/${vendorId}/Accept`, {});
  }

  reject(vendorId: number, desc: string): Observable<void> {
    return this.http.put<void>(`api/VendorManagements/${vendorId}/Reject`, {
      reasonDescription: desc,
    });
  }

  addContract(vendorId: number, form: FormData): Observable<void> {
    return this.http.post<void>(
      `api/VendorManagements/${vendorId}/Contracts`,
      form,
    );
  }

  contract(vendorId: number): Observable<any> {
    return this.http.get<any>(`api/VendorManagements/${vendorId}/Contracts`);
  }

  download(fieldId: number): Observable<IFinancialDownloadFileResponseModel> {
    return this.http.get<IFinancialDownloadFileResponseModel>(
      `api/Vendors/DownloadFile/${fieldId}`,
    );
  }
}
