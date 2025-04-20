export interface ISettlementReportsListModel {
  vendorBalanceType: number;
  amount: number;
  description: string;
  createDate: string;
  vendorTitle: string;
}

export interface ISettlementFilterModel {
  FromAmount: number;
  ToAmount: number;
  VendorBalanceTypes: number;
  Description: string;
  FromCreateDate: string;
  ToCreateDate: string;
}
