import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {
  IVendorRegisterModel,
  IVendorRequestRegisterModel,
} from '../interfaces/vendor-request-register.model';
import { IVendorRegisterResponseModel } from '../interfaces/vendor-register-response.model';
import { IAuthModel } from '@core/interfaces/token.model';
import { IVendorInfoResponseModel } from '../interfaces/vendor-info.model';

@Injectable({
  providedIn: 'root',
})
export class VendorAuthService {
  private _mobileVerifiedSubject = new Subject<string>();
  mobileVerified$ = this._mobileVerifiedSubject.asObservable();

  constructor(private http: HttpClient) {}

  mobileVerification(
    model: IVendorRequestRegisterModel,
  ): Observable<IVendorRegisterResponseModel> {
    return this.http.post<IVendorRegisterResponseModel>(
      'api/vendors/RequestRegister',
      model,
    );
  }

  register(model: IVendorRegisterModel): Observable<IAuthModel> {
    return this.http.post<IAuthModel>('api/vendors/Register', model);
  }

  vendorInfo(): Observable<IVendorInfoResponseModel> {
    return this.http.get<IVendorInfoResponseModel>('api/Vendors/Info');
  }
}
