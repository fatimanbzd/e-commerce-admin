export interface IProductsListModel {
  id: number;
  vendorDisplayName: string;
  inventory: number;
  isProductExist: boolean;
  persianTitle: string;
  englishTitle: string;
  productCategoryName: string;
  brandPersianTitle: string;
  isPublishable: boolean;
  isActive: boolean;
  weightCategory: number;
  code: string;
  productPriceInventory: number;
  createDate: string;
  vendorId: number;
  imageSrc: string;
}
