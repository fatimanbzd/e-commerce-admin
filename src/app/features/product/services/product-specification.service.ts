import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  IAddProductSpecificationModel,
  IProductSpecificationsAddResponseModel,
  IProductSpecificationsResponseModel,
} from '../interfaces/product-specification.model';

@Injectable({
  providedIn: 'root',
})
export class ProductSpecificationService {
  constructor(private http: HttpClient) {}

  addProductSpec(
    productId: number,
    model: IAddProductSpecificationModel,
  ): Observable<IProductSpecificationsAddResponseModel> {
    return this.http.post<any>(
      `api/Products/${productId}/ProductSpecifications`,
      model,
    );
  }

  updateProductSpec(
    productId: number,
    productSpecificationsId: number,
    model: IAddProductSpecificationModel,
  ): Observable<IProductSpecificationsAddResponseModel> {
    return this.http.put<any>(
      `api/Products/${productId}/ProductSpecifications/${productSpecificationsId}`,
      model,
    );
  }

  productSpecs(
    productId: number | null,
  ): Observable<IProductSpecificationsResponseModel[]> {
    return this.http.get<any>(
      `api/Products/${productId}/ProductSpecifications`,
    );
  }

  removeSpec(productId: number, specId: number): Observable<void> {
    return this.http.delete<void>(
      `api/Products/${productId}/ProductSpecifications/${specId}`,
    );
  }

  publish(productId: number, specId: number): Observable<void> {
    return this.http.put<void>(
      `api/Products/${productId}/ProductSpecifications/${specId}/Publish`,
      {
        productId: productId,
        productSpecificationsId: specId,
      },
    );
  }
}
