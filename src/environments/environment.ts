import { IEnvironmentModel } from '../app/shared/interfaces/environment.model';


export const environment: IEnvironmentModel = {
  production: false,
  apiUrl: 'http://10.180.7.11:7057/',
  // apiUrl: 'http://10.180.7.11:7058/',
  appVersion: `dev-01`,
  settings: {
    auth: {
      clientId: 'client-id',
      secretId: 'secret-id',
      accessToken: 'adminToken',
      accessTokenKey: 'DoPS3ZrQjM',
      refreshTokenKey: 'nmlP8PW2nb',
      userInformation: 'user-information',
    },
  },
};
