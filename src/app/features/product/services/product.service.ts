import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProductCategoryResponseModel } from '@core/interfaces/product-category.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IListModel } from '@core/interfaces/list.model';
import {
  IProductAddModel,
  IProductAddResponseModel,
  IProductBaseInfoAddResponseModel,
} from '../interfaces/product-add.model';
import { IProductUnitResponseModel } from '../interfaces/product-unit-response.model';
import { IProductBrandResponseModel } from '../interfaces/product-brand-response.model';
import { IProductsListModel } from '../interfaces/products-list.model';
import { IProductSetUnPublishableModel } from '../interfaces/product-setUnPublishable.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  private _productIdSubject = new BehaviorSubject<number>(0);
  productId$ = this._productIdSubject.asObservable();

  setProductId(value: number) {
    this._productIdSubject.next(value);
  }

  categories(): Observable<IListModel<IProductCategoryResponseModel>> {
    return this.http.get<IListModel<IProductCategoryResponseModel>>(
      'api/ProductCategories/search',
    );
  }

  brands(): Observable<IProductBrandResponseModel[]> {
    return this.http.get<IProductBrandResponseModel[]>('api/brands/search');
  }

  units(): Observable<IProductUnitResponseModel[]> {
    return this.http.get<IProductUnitResponseModel[]>(
      'api/ProductUnits/search',
    );
  }

  addProduct(model: IProductAddModel): Observable<IProductAddResponseModel> {
    return this.http.post<IProductAddResponseModel>('api/products', model);
  }

  updateProduct(productId: number, model: IProductAddModel): Observable<void> {
    return this.http.put<void>(`api/products/${productId}`, model);
  }

  products(params: HttpParams): Observable<IListModel<IProductsListModel>> {
    return this.http.get<IListModel<IProductsListModel>>('api/Products', {
      params: params,
    });
  }

  product(id: number): Observable<IProductBaseInfoAddResponseModel> {
    return this.http.get<IProductBaseInfoAddResponseModel>(
      `api/Products/${id}`,
    );
  }

  productPending(id: number): Observable<IProductBaseInfoAddResponseModel> {
    return this.http.get<IProductBaseInfoAddResponseModel>(
      `api/Products/${id}/Pending`,
    );
  }

  // productVendor(productId: number): Observable<IProductVendorModel[]> {
  //   return this.http.get<IProductVendorModel[]>(`api/Products/${productId}/Vendors`);
  // }

  setPublishable(productId: number): Observable<void> {
    return this.http.put<void>(`api/Products/${productId}/SetPublishable`, {});
  }

  setUnPublishable(
    productId: number,
    model: IProductSetUnPublishableModel,
  ): Observable<void> {
    return this.http.put<void>(
      `api/Products/${productId}/SetUnPublishable`,
      model,
    );
  }

  Active(productId: number): Observable<void> {
    return this.http.put<void>(`api/Products/${productId}/Active`, {});
  }

  InActive(productId: number): Observable<void> {
    return this.http.put<void>(`api/Products/${productId}/InActive`, {});
  }
}
