export interface IVendorInfoResponseModel {
  displayName: string;
  isAccepted: boolean;
  vendorType: number;
  logo: string | null;
  vendorStatus: number;
  numberOfMessages: number;
}

export interface IVendorPersonalResponseModel {
  name: string;
  family: string;
}
