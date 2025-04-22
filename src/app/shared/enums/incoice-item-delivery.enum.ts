export enum IInvoiceItemDeliveryEnum {
  SendByCourier,
  Post,

}

export const InvoiceItemDeliveryLabel: {
  [key in IInvoiceItemDeliveryEnum]: string;
} = {
  [IInvoiceItemDeliveryEnum.SendByCourier]: 'ارسال با پیک',
  [IInvoiceItemDeliveryEnum.Post]: 'پست',
};
