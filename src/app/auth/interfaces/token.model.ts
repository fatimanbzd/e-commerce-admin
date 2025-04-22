import {UserTypeEnum} from '../../shared/enums/user-type.enum';


export interface IAuthModel {
  userName: string;
  userType?: UserTypeEnum;
  expireDate: Date;
  token: string;
}
