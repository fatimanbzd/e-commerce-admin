export enum VendorDocumentTypeEnum {
  nationalCardImageFront,
  nationalCardImageBehind,
  businessLicense,
  other,
}

export const VendorDocumentTypeLabel: Record<VendorDocumentTypeEnum, string> = {
  [VendorDocumentTypeEnum.nationalCardImageFront]: 'تصویر روی کارت ملی',
  [VendorDocumentTypeEnum.nationalCardImageBehind]: 'تصویر پشت کارت ملی',
  [VendorDocumentTypeEnum.businessLicense]: 'تصویر جواز کسب و کار',
  [VendorDocumentTypeEnum.other]: 'سایر',
};
