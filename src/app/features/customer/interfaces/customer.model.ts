import { IBaseFilterModel } from '../../../shared/interfaces/filter-model';

export interface ICustomerResponseModel {
  id: number;
  name: string;
  family: string;
  fullName: string;
  mobileNumber?: string;
  nationalNumber?: string;
  userName: string;
}

export interface ICustomerFilterModel extends IBaseFilterModel {
  fullName: string;
  userName: string;
  nationalNumber: string;
}
