export interface IVendorDetailModel {
  id: number,
  vendorType: number,
  name: string,
  family: string,
  vendorTitle: string,
  organizationName: string,
  agentName: string,
  agentFamily: string,
  agentMobileNumber: string,
  nationalNumber: string,
  phoneNumber: string,
  email: string,
  mobileNumber: string,
  economicCode: string,
  classCode: string,
  siteUrl: string,
  storeDescription: string,
  logoArray: string,
  logo: string,
  storeAddressId: number,
  cardNumber: string,
  shabaNumber: string,
  depositNumber: string,
  depositOwnerFullName: string,
  haveValueAddedTax: boolean,
  storeAddress: string,
  userName: string,
  status: number,
  isActive: boolean,
  createDate: string,
  modifiedDate: string
  documents: IDocumentsModel[];





}
export interface IDocumentsModel {
  documentId: number;
  documentType: number;
  fileId: number;

}
