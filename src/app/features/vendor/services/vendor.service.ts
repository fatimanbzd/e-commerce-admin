import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IVendorCompanyModel } from '../interfaces/vendor-company.model';
import { Observable, Subject } from 'rxjs';
import {
  IFinancialDownloadFileResponseModel,
  IVendorFinancialModel,
  IVendorFinancialResponseModel,
} from '../interfaces/vendor-financial.model';

import { IVendorAddressModel } from '../interfaces/vendor-address.model';
import { IVendorContactModel } from '../interfaces/vendor-contact.model';
import { IVendorDocumentResponseModel } from '../interfaces/vendor-document.model';
import { IVendorInfoResponseModel } from '../interfaces/vendor-info-response.model';

@Injectable({
  providedIn: 'root',
})
export class VendorService {
  private documentUpdatedSubject = new Subject<void>();
  documentUpdated$ = this.documentUpdatedSubject.asObservable();

  constructor(private http: HttpClient) {}

  getVendor(): Observable<IVendorInfoResponseModel> {
    return this.http.get<IVendorInfoResponseModel>('api/Vendors/Info');
  }

  getCompany(): Observable<IVendorCompanyModel> {
    return this.http.get<IVendorCompanyModel>('api/Vendors/CompanyInformation');
  }

  updateCompany(model: Partial<IVendorCompanyModel>): Observable<void> {
    return this.http.put<void>('api/Vendors/CompanyInformation', model);
  }

  getContact(): Observable<IVendorContactModel> {
    return this.http.get<IVendorContactModel>('api/Vendors/ContactInformation');
  }

  updateContact(model: IVendorContactModel): Observable<void> {
    return this.http.put<void>('api/Vendors/ContactInformation', model);
  }

  getAddress(): Observable<IVendorAddressModel> {
    return this.http.get<IVendorAddressModel>('api/Vendors/Location');
  }

  getFinancial(): Observable<IVendorFinancialResponseModel> {
    return this.http.get<IVendorFinancialResponseModel>(
      'api/Vendors/FinancialInformation',
    );
  }

  updateFinancial(model: IVendorFinancialModel): Observable<void> {
    return this.http.put<void>('api/Vendors/FinancialInformation', model);
  }

  setDocumentUpdated() {
    this.documentUpdatedSubject.next();
  }

  updateAddress(model: IVendorAddressModel): Observable<void> {
    return this.http.put<void>('api/Vendors/Location', model);
  }

  updateOfficialNewsPagerDocument(formData: FormData): Observable<number> {
    return this.http.put<number>(
      'api/Vendors/OfficialNewspaperDocument',
      formData,
    );
  }

  documents(): Observable<IVendorDocumentResponseModel[]> {
    return this.http.get<IVendorDocumentResponseModel[]>(
      'api/Vendors/Documents',
    );
  }

  download(fieldId: number): Observable<IFinancialDownloadFileResponseModel> {
    return this.http.get<IFinancialDownloadFileResponseModel>(
      `api/Vendors/DownloadFile/${fieldId}`,
    );
  }

  removeDocument(vendorDocumentId: number): Observable<void> {
    return this.http.delete<void>(`api/Vendors/Documents/${vendorDocumentId}`);
  }

  uploadDocument(formData: FormData): Observable<void> {
    return this.http.post<void>('api/Vendors/Documents', formData);
  }

  uploadLogo(formData: FormData): Observable<void> {
    return this.http.put<void>('api/Vendors/logo', formData);
  }

  addRequest(): Observable<void> {
    return this.http.put<void>('api/Vendors/ReviewRequest', {});
  }

  cancelRequest(): Observable<void> {
    return this.http.put<void>('api/Vendors/CancelReviewRequest', {});
  }
}
