export interface IBillResponseModel {
  invoiceId: number;
  customerFullName: string;
  invoiceNumber: string;
  createDate: string;
  sumProductPrice: number;
  sumDiscountAmount: number;
  sumWithoutTaxAmount: number;
  vendorTitle: string;
  sumLastAmount: number;
}

export interface IBillFilterModel {
  InvoiceNumber: number;
  fromDate: string;
  toDate: string;
}
