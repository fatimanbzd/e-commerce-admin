export interface ISettlementListModel {
  invoiceNumber: number;
  customerFullName: string;
  totalLastAmount: number;
  createDate: string;
  description: string;

  checked?: boolean;
}
