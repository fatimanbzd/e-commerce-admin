import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ILoginModel } from '../../auth/interfaces/login.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

import { IAuthModel } from '@core/interfaces/token.model';
import { UserInformationStorageService } from './user-information-storage.service';
import { IUserModel } from '@core/interfaces/user.model';
import { ICurrentUserModel } from '../interfaces/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _userInformationSubject = new BehaviorSubject<IUserModel | null>(
    null,
  );
  userInformation$ = this._userInformationSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private userInformationStorageService: UserInformationStorageService,
  ) {}

  login(model: ILoginModel): Observable<IAuthModel> {
    return this.http.post<IAuthModel>('api/Accounts/Login', model).pipe(
      tap((response) => {
        this.tokenStorageService.saveAccessToken(response);
      }),
    );
  }

  doLoginUser(auth: IAuthModel, user: ICurrentUserModel) {
    this.setUserAuthenticated({
      name: '',
      family: '',
      displayName: user.displayName,
      mobileNumber: '',
      nationalNumber: '',
      id: 0,
      userName: user.userName,
      needToChangePassword: user.needToChangePassword,
    } as IUserModel);
    if (user.needToChangePassword)
      this.router.navigateByUrl('/pages/vendor/change-password');
    else this.router.navigateByUrl('/pages');
  }

  getUserAuthenticated() {
    return this.userInformationStorageService.getUserInformation();
  }

  setUserAuthenticated(value: IUserModel) {
    this.userInformationStorageService.saveUserInformation(value);
  }

  currentUser(): Observable<ICurrentUserModel> {
    return this.http.get<ICurrentUserModel>('api/Accounts/Info');
  }

  logout() {
    this.tokenStorageService.removeTokens();
    this.userInformationStorageService.removeUserInformation();
    this.setUserInformation(null);
    this.router.navigate(['/login']);
  }

  setUserInformation(user: IUserModel | null) {
    this._userInformationSubject.next(user);
  }

  getToken() {
    return this.tokenStorageService.getAccessToken();
  }

  getRole() {
    return this.getToken().userType;
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  needToChangePassword() {
    return this.getUserAuthenticated().needToChangePassword;
  }
}
