import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IListModel } from '../../../shared/interfaces/list.model';
import { IOrdersListModel } from '../interfaces/orders-list.model';
import { IVendorsModel } from '../interfaces/vendors.model';
import { IOrderDetailModel } from '../interfaces/order-detail.model';
import {
  IAggregateStatisticsOrderResponseModel,
  IOrderStatisticFilterModel,
} from '../interfaces/order-statistic.model';
import { IChangeOrderStatusModel } from '../interfaces/change-order-status.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  orders(params: HttpParams): Observable<IListModel<IOrdersListModel>> {
    return this.http.get<IListModel<IOrdersListModel>>('api/Invoices', {
      params: params,
    });
  }

  getVendor(): Observable<IVendorsModel[]> {
    return this.http.get<IVendorsModel[]>('api/VendorManagements/Search');
  }

  order(id: number): Observable<IOrderDetailModel> {
    return this.http.get<IOrderDetailModel>(`api/Invoices/${id}`);
  }

  export(params?: HttpParams) {
    return this.http.get('api/Invoices/excel', { params: params });
  }

  updateOrderItemStatus(
    invoiceId: number,
    invoiceItemId: number,
    model: Partial<IChangeOrderStatusModel>,
  ): Observable<void> {
    return this.http.put<void>(
      `api/Invoices/${invoiceId}/Items/${invoiceItemId}/ChangeState`,
      model,
    );
  }

  finalTransaction(invoiceId: number) {
    return this.http.put(`api/Invoices/${invoiceId}/FinalizeTransaction`, {
      invoiceId: invoiceId,
    });
  }

  //Statistics reports

  aggregateStatisticsValueOfOrders(
    filter: Partial<IOrderStatisticFilterModel> | null,
  ): Observable<IAggregateStatisticsOrderResponseModel> {
    return this.http.get<IAggregateStatisticsOrderResponseModel>(
      'api/Report/AggregateStatisticsValueOfOrders',
      {
        params: filter ?? {},
      },
    );
  }

  aggregateStatisticsOrderCount(
    filter: Partial<IOrderStatisticFilterModel> | null,
  ): Observable<IAggregateStatisticsOrderResponseModel> {
    return this.http.get<IAggregateStatisticsOrderResponseModel>(
      'api/Report/AggregateStatisticsCountOfOrders',
      {
        params: filter ?? {},
      },
    );
  }
  aggregateStatisticsCustomerCount(
    filter: Partial<IOrderStatisticFilterModel> | null,
  ): Observable<IAggregateStatisticsOrderResponseModel> {
    return this.http.get<IAggregateStatisticsOrderResponseModel>(
      'api/Report/AggregateStatisticsCustomerCountOfOrders',
      {
        params: filter ?? {},
      },
    );
  }

  aggregateStatisticsProductCount(
    filter: Partial<IOrderStatisticFilterModel> | null,
  ): Observable<IAggregateStatisticsOrderResponseModel> {
    return this.http.get<IAggregateStatisticsOrderResponseModel>(
      'api/Report/AggregateStatisticsProductCountOfOrders',
      {
        params: filter ?? {},
      },
    );
  }
}
