export interface IOrdersListModel {
  id: number;
  customerFullName: string;
  invoiceNumber: string;
  invoiceState: number;
  invoiceRegisterDate: string;
  invoiceTotalAmount: number;
  paid: boolean;
  vendors: string;
}

export interface IOrdersFilterModel {
  customerFullName: string;
  customerUserName: string;
  invoiceNumber: string;
  paid: boolean;
  invoiceStates: number;
  productTitle: string;
  fromRegisterDate: string;
  toRegisterDate: string;
}
