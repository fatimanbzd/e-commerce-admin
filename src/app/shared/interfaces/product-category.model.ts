export interface IProductCategoryResponseModel {
  id: number;
  name: string;
  isActive: boolean;
  parentId: number;
  parentName: string | null;
  description: string;
}
export interface IProductCategoryTreeModel {
  key: number;
  name: string;
  isActive: boolean;
  parentId: number;
  children?: IProductCategoryTreeModel[];
}
