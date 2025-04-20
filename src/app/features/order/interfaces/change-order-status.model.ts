import { InvoiceItemStatusEnum } from '@core/enums/invoice-item-status.enum';

export interface IChangeOrderStatusModel {
  sendStatus: InvoiceItemStatusEnum;
  deliveryType: number;
  deliveryDate: string;
  deliveryTime: string;
  deliveredCode: string;
  shipmentNumber: string;
}
