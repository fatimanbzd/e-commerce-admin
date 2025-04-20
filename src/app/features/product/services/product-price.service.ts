import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  IAddProductPricesModel,
  IColorsModel,
  IProductPricesAddResponseModel,
  IProductPricesModel,
} from '../interfaces/product-price.model';

@Injectable({
  providedIn: 'root',
})
export class ProductPriceService {
  constructor(private http: HttpClient) {}

  addProductPrice(
    productId: any,
    model: IAddProductPricesModel,
  ): Observable<IProductPricesAddResponseModel> {
    return this.http.post<IProductPricesAddResponseModel>(
      `api/Products/${productId}/ProductPrices`,
      model,
    );
  }

  updateProductPrice(
    productId: number | null,
    productPriceId: number,
    model: IAddProductPricesModel,
  ): Observable<IProductPricesAddResponseModel> {
    return this.http.put<IProductPricesAddResponseModel>(
      `api/Products/${productId}/ProductPrices/${productPriceId}`,
      model,
    );
  }

  productPrices(productId: number | null): Observable<IProductPricesModel[]> {
    return this.http.get<IProductPricesModel[]>(
      `api/Products/${productId}/ProductPrices`,
    );
  }

  productPrice(
    productId: number | null,
    productPriceId: number,
  ): Observable<IProductPricesModel> {
    return this.http.get<IProductPricesModel>(
      `api/Products/${productId}/ProductPrices/${productPriceId}`,
    );
  }

  getColor(): Observable<IColorsModel[]> {
    return this.http.get<IColorsModel[]>('api/Colors/Search');
  }

  deletePrice(
    productId: number | null,
    productPriceId: number | null,
  ): Observable<any> {
    return this.http.delete<any>(
      `api/Products/${productId}/ProductPrices/${productPriceId}`,
    );
  }
}
