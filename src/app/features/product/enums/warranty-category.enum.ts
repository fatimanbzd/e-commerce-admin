export enum ProductGuarantyEnum {
  Corporate = 1,
  ProductAuthenticity,
  MainGuaranty,
  NoGuaranty,
  _18Month,
  _24Month,
}

export const WarrantyCategoryLabel: { [key in ProductGuarantyEnum]: string } = {
  [ProductGuarantyEnum.Corporate]: 'شرکتی',
  [ProductGuarantyEnum.ProductAuthenticity]: 'اصالت محصول',
  [ProductGuarantyEnum.MainGuaranty]: 'گارانتی اصلی',
  [ProductGuarantyEnum.NoGuaranty]: 'بدون گارانتی',
  [ProductGuarantyEnum._18Month]: 'گارانتی 18 ماهه',
  [ProductGuarantyEnum._24Month]: 'گارانتی 24 ماهه',
};
