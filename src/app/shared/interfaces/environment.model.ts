export interface IEnvironmentModel {
  production: boolean;
  apiUrl: string;
  appVersion?: string;
  settings: ISettingMode;
  serviceWorker?: boolean;
}

interface ISettingMode {
  auth: IAuthSettingModel;
}

interface IAuthSettingModel {
  clientId: string;
  secretId: string;
  accessToken: string;
  accessTokenKey: string;
  refreshTokenKey: string;
  userInformation: string;
}
