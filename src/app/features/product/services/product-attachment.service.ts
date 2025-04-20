import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  IAddProductAttachmentResponseModel,
  IProductAttachmentResponseModel,
} from '../interfaces/product-attachment.model';

@Injectable({
  providedIn: 'root',
})
export class ProductAttachmentService {
  constructor(private http: HttpClient) {}

  images(productId: number): Observable<IProductAttachmentResponseModel[]> {
    return this.http.get<IProductAttachmentResponseModel[]>(
      `api/Products/${productId}/Images`,
    );
  }

  image(fileId: number): Observable<void> {
    return this.http.get<void>(`/api/Images/${fileId}`);
  }

  add(
    productId: number,
    formData: FormData,
  ): Observable<IAddProductAttachmentResponseModel> {
    return this.http.post<IAddProductAttachmentResponseModel>(
      `api/Products/${productId}/Images`,
      formData,
    );
  }

  remove(productId: number, imageId: number): Observable<void> {
    return this.http.delete<void>(
      `api/Products/${productId}/Images/${imageId}`,
    );
  }

  setAsDefault(productId: number, imageId: number): Observable<void> {
    return this.http.put<void>(
      `api/Products/${productId}/Images/${imageId}/Default`,
      {
        productId: productId,
        productImageId: imageId,
      },
    );
  }

  publish(productId: number, imageId: number): Observable<void> {
    return this.http.put<void>(
      `api/Products/${productId}/Images/${imageId}/Publish`,
      {
        productId: productId,
        productImageId: imageId,
      },
    );
  }
}
