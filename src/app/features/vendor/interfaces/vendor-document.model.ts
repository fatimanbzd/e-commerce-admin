import { VendorDocumentTypeEnum } from '../enums/vendor-document-type.enum';

export interface IVendorDocumentResponseModel {
  documentId: number;
  documentType: VendorDocumentTypeEnum;
  fileId: number;
}
