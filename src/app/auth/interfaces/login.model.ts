import { UserTypeEnum } from '../../shared/enums/user-type.enum';

export interface ILoginModel {
  userName: string;
  password: string;
  captchaCode: string;
  userType: UserTypeEnum;
}
