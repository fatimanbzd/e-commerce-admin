import { VendorTypeEnum } from '../../../auth/enums/vendor-type.enum';

export interface IVendorResponseModel {
  id: number;
  mobileNumber?: string;
  nationalNumber?: string;
  name: string;
  family: string;
  persianStoreName: string;
  englishStoreName: string;
  vendorType: VendorTypeEnum;
  companyName: string;
  companyType: number;
  status: number;
}
