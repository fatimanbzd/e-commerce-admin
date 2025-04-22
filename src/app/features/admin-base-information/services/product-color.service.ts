import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IListModel } from '../../../shared/interfaces/list.model';
import { IProductColor } from '../interfaces/product-color.model';

@Injectable({
  providedIn: 'root',
})
export class ProductColorService {
  constructor(private http: HttpClient) {}

  colors(params: HttpParams): Observable<IListModel<IProductColor>> {
    return this.http.get<IListModel<IProductColor>>('api/Colors', {
      params: params,
    });
  }
  addColor(body: any): Observable<void> {
    return this.http.post<void>(`api/Colors`, body);
  }

  editColor(colorId: number, body: any): Observable<void> {
    return this.http.put<void>(`api/Colors/${colorId}`, body);
  }

  getColor(id: number): Observable<IProductColor> {
    return this.http.get<IProductColor>(`api/Colors/${id}`);
  }

  deleteColor(colorId: number | undefined): Observable<any> {
    return this.http.delete<any>(`api/Colors/${colorId}`);
  }
}
