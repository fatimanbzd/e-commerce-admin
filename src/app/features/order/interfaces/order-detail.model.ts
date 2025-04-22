import { InvoiceStatusEnum } from '../../../shared/enums/invoice-status.enum';
import { InvoiceItemStatusEnum } from '../../../shared/enums/invoice-item-status.enum';

export interface IOrderDetailModel {
  invoiceId: number;
  invoiceState: InvoiceStatusEnum;
  invoiceTotalAmount: number;
  invoiceDescription: string;
  recipientFullName: string;
  recipientMobileNumber: string;
  recipientAddress: string;
  recipientPostalCode: string;
  invoiceNumber: string;
  invoiceRegisterDate: string;
  customerFullName: string;
  customerMobileNumber: string;
  customerNationalNumber: string;
  discountAmount: number;
  items: IOrderDetailProductModel[];
  sellerInformation: ISellerInformationModel;
  transactions: ITransactionModel[];
  shippingCostAmount: number;
}

export interface ISellerInformationModel {
  sellerName: string;
  sellerAddress: string;
  sellerNationalNumber: string;
  sellerPostalCode: string;
  sellerPhoneNumber: string;
  sellerEconomicCode: string;
  companyRegistrationId: string;
}

export interface IOrderDetailProductModel {
  invoiceItemId: number;
  count: number;
  price: number;
  productId: number;
  productTitle: string;
  imageSrc: string;
  productVendorId: number;
  productVendorTitle: string;
  productDiscountAmount: string;
  productPriceColorId: number;
  productPriceColorData: string;
  productPriceColorName: string;
  productGuaranty: number;
  sendStatus: InvoiceItemStatusEnum;
  deliveryCode?: string;
  taxAmount: number;
  lastAmount: number;
  productCode: number;
  deliveryType: number;
  deliveryDate: string;
  deliveryTime: string;
  shipmentNumber: string;
}

export interface IOrderItemChangeStatusModel {
  sendStatus: number;
  reason: string;
}

export interface ITransactionModel {
  totalAmount: number;
  createDate: string;
  description: string;
}
