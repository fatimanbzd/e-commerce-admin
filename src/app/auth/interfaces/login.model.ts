import { UserTypeEnum } from '@core/enums/user-type.enum';

export interface ILoginModel {
  userName: string;
  password: string;
  captchaCode: string;
  userType: UserTypeEnum;
}
