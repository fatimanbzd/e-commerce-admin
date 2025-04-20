import { VendorTypeEnum } from '../enums/vendor-type.enum';

export interface IVendorRequestRegisterModel {
  mobileNumber: string;
}

export interface IVendorRegisterModel {
  verificationCode: string;
  mobileNumber: string;
  nationalNumber: string;
  vendorType: VendorTypeEnum;
}
