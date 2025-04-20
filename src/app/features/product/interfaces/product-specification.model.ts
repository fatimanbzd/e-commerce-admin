export interface IAddProductSpecificationModel {
  groupName: string;
  productSpecifications: IProductSpecificationsModel[];
}

export interface IProductSpecificationsModel {
  key: string;
  value: string;
  isSpecial: boolean;
}

export interface IProductSpecificationsAddResponseModel {
  id: number;
}

export interface IProductSpecificationsResponseModel {
  productSpecificationsId: number;
  groupName: string;
  isPublishable: boolean;
  productSpecifications: IProductSpecificationsModel[];
  expand: boolean;
}
