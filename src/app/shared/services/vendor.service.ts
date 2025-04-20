import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IVendorModel } from '../interfaces/vendor.model';

@Injectable({
  providedIn: 'root',
})
export class VendorService {
  constructor(private http: HttpClient) {}

  vendors(): Observable<IVendorModel[]> {
    return this.http.get<IVendorModel[]>('api/VendorManagements/search');
  }
}
