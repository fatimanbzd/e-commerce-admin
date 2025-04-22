export enum InvoiceStatusEnum {
  register = 0,
  paying = 10,
  paid = 12,
  LookingIntoOtherSuppliers = 30,
  complete = 40,
  LackOfSupply = 47,
  cancel = 50,
  Finalize = 55,
}

export const InvoiceStatusLabel: { [key in InvoiceStatusEnum]: string } = {
  [InvoiceStatusEnum.register]: 'ثبت اولیه',
  [InvoiceStatusEnum.paying]: 'در حال پرداخت',
  [InvoiceStatusEnum.paid]: 'پرداخت شده',
  [InvoiceStatusEnum.LookingIntoOtherSuppliers]:
    'در دست بررسی سایر تامین کنندگان',
  [InvoiceStatusEnum.complete]: 'تکمیل نهایی',
  [InvoiceStatusEnum.LackOfSupply]: 'عدم تامین همه',
  [InvoiceStatusEnum.cancel]: 'لغو',
  [InvoiceStatusEnum.Finalize]: 'نهایی سازی تراکنش ها بعد از تکمیل نهایی',
};
