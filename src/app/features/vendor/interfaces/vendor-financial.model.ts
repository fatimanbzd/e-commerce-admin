export interface IVendorFinancialModel {
  cardNumber: string;
  shabaNumber: string;
  depositNumber: string;
  ownerFullName: string;
  haveValueAddedTax: boolean;
}
export interface IVendorAccountOwnerModel {
  name: string;
  family: string;
  nationalNumber: string;
}

export interface IVendorAccountOwnerDocumentModel {
  nationalNumber: string;
  accountOwnerDocumentFile: string;
  isFront: boolean;
}

export interface IVendorFinancialResponseModel {
  cardNumber: string;
  shabaNumber: string;
  accountOwners: IVendorAccountOwnerResponseModel[];
  haveValueAddedTax: boolean;
  valueAddedTaxAttachmentId: number | null;
}

export interface IVendorAccountOwnerResponseModel {
  name: string;
  family: string;
  nationalNumber: string;
  nationalCardImageBehindAttachmentId: number;
  nationalCardImageFrontAttachmentId: number;
}

export interface IFinancialDownloadFileResponseModel {
  fileName: string;
  file: string;
  contentType: string;
}

export interface IVendorTaxVm {
  hasTax: boolean;
  taxId: number | null;
}
