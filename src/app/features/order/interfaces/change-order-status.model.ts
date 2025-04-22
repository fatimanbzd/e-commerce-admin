import { InvoiceItemStatusEnum } from '../../../shared/enums/invoice-item-status.enum';

export interface IChangeOrderStatusModel {
  sendStatus: InvoiceItemStatusEnum;
  deliveryType: number;
  deliveryDate: string;
  deliveryTime: string;
  deliveredCode: string;
  shipmentNumber: string;
}
