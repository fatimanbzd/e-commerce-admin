export interface IManagementCommentResponseModel {
  productCustomerCommentId: number;
  productId: number;
  productTitle: string;
  customerFullName: string;
  registerAsAnonymous: boolean;
  isBuyer: boolean;
  rating: number;
  title: string;
  advantages: string[];
  disadvantages: string[];
  body: string;
  isAllowedToShow: boolean;
  createDate: string;
}
