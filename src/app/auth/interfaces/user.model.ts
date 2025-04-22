export interface IUserModel {
  id: number;
  name?: string;
  family?: string;
  mobileNumber: string;
  nationalNumber?: string;
  displayName?: string;
  needToChangePassword: boolean;
}
export interface IUserViewModel {
  name: string;
  family: string;
  mobileNumber: string;
  displayName: string;
}
export interface IUpdateUserProfileModel {
  name: string;
  family: string;
  nationalNumber: string;
}
