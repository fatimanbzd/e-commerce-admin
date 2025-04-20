export enum VendorDocumentTypeEnum {
  NationalCardImageFront = 0,
  NationalCardImageBehind = 1 ,
  BusinessLicense = 2 ,
  Other = 3 ,
}

export const VendorDocumentTypeLabel: { [key in VendorDocumentTypeEnum]: string } = {
  [VendorDocumentTypeEnum.NationalCardImageFront]: 'تصویر روی کارت ملی',
  [VendorDocumentTypeEnum.NationalCardImageBehind]: 'تصویر پشت کارت ملی',
  [VendorDocumentTypeEnum.BusinessLicense]: 'تصویر جواز کسب و کار',
  [VendorDocumentTypeEnum.Other]: 'سایر',
};
