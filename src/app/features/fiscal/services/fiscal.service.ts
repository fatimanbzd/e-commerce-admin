import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IListModel } from '@core/interfaces/list.model';
import { IVendorsListModel } from '../interfaces/vendors-list.model';
import { ISettlementReportsListModel } from '../interfaces/settlement-reports-list.model';
import { ISettlementListModel } from '../interfaces/settlement-list.model';
import { ISettleModel } from '../interfaces/settle.model';

@Injectable({
  providedIn: 'root',
})
export class FiscalService {
  constructor(private http: HttpClient) {}

  vendorsList(params: HttpParams): Observable<IListModel<IVendorsListModel>> {
    return this.http.get<IListModel<IVendorsListModel>>('api/Fiscal/Vendors', {
      params: params,
    });
  }

  settlementList(
    vendorId: number,
    params: HttpParams,
  ): Observable<IListModel<ISettlementListModel>> {
    return this.http.get<IListModel<ISettlementListModel>>(
      `api/Fiscal/${vendorId}/PendingInvoices`,
      { params: params },
    );
  }

  settle(vendorId: number, invoiceNumbers: ISettleModel): Observable<void> {
    return this.http.post<void>(
      `api/Fiscal/${vendorId}/Settlement`,
      invoiceNumbers,
    );
  }

  settlementReport(
    params: HttpParams,
  ): Observable<IListModel<ISettlementReportsListModel>> {
    return this.http.get<IListModel<ISettlementReportsListModel>>(
      'api/Fiscal/Transactions',
      { params: params },
    );
  }
}
