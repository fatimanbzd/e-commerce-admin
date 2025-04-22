import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IVendorMessageModel } from '../../features/vendor/interfaces/vendorMessage.model';
import {IListModel} from '../interfaces/list.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private http: HttpClient) {}

  private _messageReadSubject = new Subject<void>();
  messageRead$ = this._messageReadSubject.asObservable();

  notifications(
    params: HttpParams,
  ): Observable<IListModel<IVendorMessageModel>> {
    return this.http.get<IListModel<IVendorMessageModel>>('api/Notifications', {
      params: params,
    });
  }

  readNotification(id: number): Observable<void> {
    return this.http.put<void>(`api/Notifications/${id}/Read`, {});
  }

  setMessageRead() {
    this._messageReadSubject.next();
  }
}
