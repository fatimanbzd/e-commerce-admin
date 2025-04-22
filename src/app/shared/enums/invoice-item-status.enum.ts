export enum InvoiceItemStatusEnum {
  underReview,
  accepted,
  waitingToSend,
  sent,
  delivered,
  lackOfSupply,
}

export const InvoiceItemStatusLabel: {
  [key in InvoiceItemStatusEnum]: string;
} = {
  [InvoiceItemStatusEnum.underReview]: 'درحال بررسی',
  [InvoiceItemStatusEnum.accepted]: 'تایید شده',
  [InvoiceItemStatusEnum.waitingToSend]: 'منتظر ارسال',
  [InvoiceItemStatusEnum.sent]: 'ارسال شده',
  [InvoiceItemStatusEnum.delivered]: 'تحویل داده شده',
  [InvoiceItemStatusEnum.lackOfSupply]: 'عدم تامین',
};
