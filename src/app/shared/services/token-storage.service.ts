import { Inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import {IEnvironmentModel} from '../interfaces/environment.model';
import {IAuthModel} from '../../auth/interfaces/token.model';


@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  private tokenInfo: string;

  constructor(
    private localStorageService: LocalStorageService,
    @Inject('environment') private environment: IEnvironmentModel,
  ) {
    this.tokenInfo = this.environment.settings.auth.accessToken;
    //this.refreshTokenKey = authSettings.refreshTokenKey || 'refreshToken';
  }

  getAccessToken(): IAuthModel {
    return this.localStorageService.getItem(this.tokenInfo) as IAuthModel;
  }

  saveAccessToken(auth: IAuthModel) {
    this.localStorageService.setItem(this.tokenInfo, auth);
  }

  // getRefreshToken(): string {
  //   return this.localStorageService.getItem(this.refreshTokenKey) as string;
  // }

  // saveRefreshToken(token: string) {
  //   this.localStorageService.setItem(this.refreshTokenKey, token);
  // }
  removeTokens() {
    this.localStorageService.removeItem(this.tokenInfo);
    // this.localStorageService.removeItem(this.refreshTokenKey);
  }
}
