import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IListModel } from '../../../shared/interfaces/list.model';
import { IManagementCommentResponseModel } from '../interfaces/management-comments.model';

@Injectable({
  providedIn: 'root',
})
export class ManagementService {
  constructor(private http: HttpClient) {}

  comments(
    params: HttpParams,
  ): Observable<IListModel<IManagementCommentResponseModel>> {
    return this.http.get<IListModel<IManagementCommentResponseModel>>(
      'api/ProductCustomerComments',
      { params: params },
    );
  }

  allowComment(
    productCustomerCommentId: number,
    productId: number,
  ): Observable<void> {
    return this.http.put<void>(
      `api/ProductCustomerComments/${productCustomerCommentId}/${productId}/Allow`,
      {},
    );
  }

  isNotAllowComment(
    productCustomerCommentId: number,
    productId: number,
  ): Observable<void> {
    return this.http.put<void>(
      `api/ProductCustomerComments/${productCustomerCommentId}/${productId}/IsNotAllowed`,
      {},
    );
  }

  deleteComment(
    productCustomerCommentId: number,
    productId: number,
  ): Observable<void> {
    return this.http.delete<void>(
      `api/ProductCustomerComments/${productCustomerCommentId}/${productId}`,
      {},
    );
  }
}
