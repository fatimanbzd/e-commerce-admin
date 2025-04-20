export interface IProductCategoryAddModel {
  name: string;
  parentId: number;
  isActive: boolean;
  description: string;
}

export interface IProductCategoryAddResponseModel {
  id: number;
}
