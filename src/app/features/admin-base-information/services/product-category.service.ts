import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProductCategoryResponseModel } from '../../../shared/interfaces/product-category.model';
import {
  IProductCategoryAddModel,
  IProductCategoryAddResponseModel,
} from '../interfaces/product-category-add.model';
import { IProductCategoryEditModel } from '../interfaces/product-category-edit.model';
import { IListModel } from '../../../shared/interfaces/list.model';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryService {
  constructor(private http: HttpClient) {}

  category(id: number): Observable<IProductCategoryResponseModel> {
    return this.http.get<IProductCategoryResponseModel>(
      `api/ProductCategories/${id}`,
    );
  }

  categories(): Observable<IListModel<IProductCategoryResponseModel>> {
    return this.http.get<IListModel<IProductCategoryResponseModel>>(
      'api/ProductCategories',
    );
  }

  addCategory(
    model: IProductCategoryAddModel,
  ): Observable<IProductCategoryAddResponseModel> {
    return this.http.post<IProductCategoryAddResponseModel>(
      'api/ProductCategories',
      model,
    );
  }

  updateCategory(
    model: IProductCategoryEditModel,
    id: number,
  ): Observable<void> {
    return this.http.put<void>(`api/ProductCategories/${id}`, model);
  }

  removeCategory(id: number): Observable<void> {
    return this.http.delete<void>(`api/ProductCategories/${id}`);
  }
}
