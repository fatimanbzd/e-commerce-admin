export interface IProductAddModel {
  persianTitle: string;
  englishTitle: string;
  productCategoryId: number;
  productTypeId: number;
  brandId: number;
  weight: number;
  weightCategory: number;
  unitId: number;
  tags: string;
  description: string | null;
  shortDescription: string | null;
  isExternalProduct: boolean;
  externalProductLink: string;
  isActive: boolean;
  productCategoryRelations: number[];
}

export interface IProductAddResponseModel {
  id: number;
}

export interface IProductBaseInfoAddResponseModel {
  id: number;
  persianTitle: string;
  englishTitle: string;
  productCategoryId: number;
  productCategoryName: string;
  productTypeId: number;
  brandId: number;
  brandPersianTitle: string;
  weight: number;
  weightCategory: number;
  unitId: number;
  unitName: string;
  tags: string;
  description: string;
  shortDescription: string;
  isExternalProduct: boolean;
  externalProductLink: string;
  isActive: boolean;
  isPublishable: boolean;
  productCategoryRelations: ProductCategories[];
  havePending: boolean;
  haveProductInformationPending: boolean;
  vendorId: number;
}

export interface ProductCategories {
  id: number;
  name: string;
  isActive: boolean;
  parentId: number;
  parentName: string;
  description: string;
}
export interface FlatNode {
  expandable: boolean;
  name: string;
  key: number;
  level: number;
  parentId: number;
  isActive: boolean;
}
