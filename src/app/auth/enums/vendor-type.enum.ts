export enum VendorTypeEnum {
  legal,
  real,
}

export const VendorTypeLabel: { [key in VendorTypeEnum]: string } = {
  [VendorTypeEnum.real]: 'حقیقی',
  [VendorTypeEnum.legal]: 'حقوقی',
};
