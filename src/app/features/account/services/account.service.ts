import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IChangePasswordModel } from '../models/changePassword.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}
  updatePassword(model: IChangePasswordModel): Observable<void> {
    return this.http.put<void>('api/Accounts/ChangePassword', model);
  }
}
