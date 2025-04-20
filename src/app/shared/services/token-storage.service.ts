import { Inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { ConfigService } from '@core/config/config.service';
import { IEnvironmentModel } from '@core/interfaces/environment.model';
import { IAuthModel } from '@core/interfaces/token.model';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  private tokenInfo: string;

  constructor(
    private configService: ConfigService,
    private localStorageService: LocalStorageService,
    @Inject('environment') private environment: IEnvironmentModel,
  ) {
    const authSettings = this.configService.getAuthSettings();
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
