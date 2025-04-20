import { InputTypeEnum } from '../enums/input-type.enum';

export interface IBaseFilterModel {
  pageSize: number;
  isAsc: boolean;
  PageNumber: number;
  orderBy: string | null;
  sortOrder: string | null;
  filters: Array<{ key: string; value: string[] }>;
}

export interface IFilterDomModel {
  label: string;
  enLabel: string;
  index: number;
  type: InputTypeEnum;
  maxlength?: string | null | number;
  minlength?: string | null | number;
  items?: any[];
  show?: boolean;
}
