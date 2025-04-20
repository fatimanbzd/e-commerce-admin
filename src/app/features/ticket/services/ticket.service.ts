import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IListModel } from '@core/interfaces/list.model';
import {
  ITicketAddResponseModel,
  ITicketInfoResponseModel,
  ITicketResponseModel,
} from '../interfaces/ticket.model';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  constructor(private http: HttpClient) {}

  tickets(params: HttpParams): Observable<IListModel<ITicketResponseModel>> {
    return this.http.get<IListModel<ITicketResponseModel>>('api/tickets', {
      params: params,
    });
  }

  ticket(id: number): Observable<ITicketInfoResponseModel> {
    return this.http.get<ITicketInfoResponseModel>(`api/tickets/${id}`);
  }

  remove(id: number): Observable<any> {
    return this.http.delete<any>(`api/tickets/${id}`);
  }

  replay(
    formData: FormData,
    id: number,
    replyId: number | null = null,
  ): Observable<ITicketAddResponseModel> {
    return this.http.post<ITicketAddResponseModel>(
      replyId
        ? `api/tickets/${id}/comments/${replyId}`
        : `api/tickets/${id}/comments`,
      formData,
    );
  }

  download(fileId: number): Observable<void> {
    return this.http.get<void>(`api/Images/${fileId}/File`);
  }
}
