export enum VendorBalanceTypeEnum {
  Sale = 10,
  Settlement = 20,
  Wage = 30,
  finalize = 40,
}

export const VendorBalanceTypeLabel: {
  [key in VendorBalanceTypeEnum]: string;
} = {
  [VendorBalanceTypeEnum.Sale]: 'فروش',
  [VendorBalanceTypeEnum.Settlement]: 'تسویه',
  [VendorBalanceTypeEnum.Wage]: 'کارمزد',
  [VendorBalanceTypeEnum.finalize]: 'نهایی سازی',
};
