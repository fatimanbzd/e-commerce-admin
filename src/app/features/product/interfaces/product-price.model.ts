export interface IAddProductPricesModel {
  colorId: number;
  productGuaranty: number;
  referenceCode: string;
  price: number;
  valueAddedTaxPercent: number;
  discountPercent: number;
  discountExpireDate: string;
  highestNumberOfOrders: number;
  lowestNumberOfOrders: number;
  inventory: number;
}

export interface IProductPricesModel {
  productPriceId: number;
  colorId: number;
  colorName: string;
  productGuaranty: number;
  referenceCode: string;
  price: number;
  valueAddedTaxPercent: number;
  discountPercent: number;
  discountExpireDate: string;
  highestNumberOfOrders: number;
  lowestNumberOfOrders: number;
  inventory: number;
  finalPrice: number;
  vendorTitle: string;
  vendorId: number;
}

export interface IProductPricesAddResponseModel {
  id: number;
}

export interface IProductPricesResponseModel {
  productPrices: IProductPricesModel[];
}

export interface IColorsModel {
  id?: number;
  name: string;
  isActive?: boolean;
  data?: string;
  description?: string;
}
