import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IListModel } from '@core/interfaces/list.model';
import { IProductBrand } from '../interfaces/product-brand.model';

@Injectable({
  providedIn: 'root',
})
export class ProductBrandService {
  constructor(private http: HttpClient) {}

  brands(params: HttpParams): Observable<IListModel<IProductBrand>> {
    return this.http.get<IListModel<IProductBrand>>('api/Brands', {
      params: params,
    });
  }

  addBrand(body: any): Observable<void> {
    return this.http.post<void>(`api/Brands`, body);
  }

  searchBrand(params: any): Observable<IListModel<IProductBrand>> {
    return this.http.get<IListModel<IProductBrand>>(
      `api/Brands/Search?searchQuery=${params}`,
    );
  }

  getBrand(id: number): Observable<IProductBrand> {
    return this.http.get<IProductBrand>(`api/Brands/${id}`);
  }

  editBrand(brandId: number, body: any): Observable<void> {
    return this.http.put<void>(`api/Brands/${brandId}`, body);
  }

  deleteBrand(brandId: number | undefined): Observable<any> {
    return this.http.delete<any>(`api/Brands/${brandId}`);
  }
}
