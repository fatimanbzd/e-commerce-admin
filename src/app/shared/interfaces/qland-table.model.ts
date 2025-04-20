import {
  NzTableFilterFn,
  NzTableFilterList,
  NzTableSortFn,
  NzTableSortOrder,
} from 'ng-zorro-antd/table';
import { SafeHtml } from '@angular/platform-browser';
import { TemplateRef, Type } from '@angular/core';
import { NzButtonType } from 'ng-zorro-antd/button';

export interface ColumnItem<T> {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<T> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<T> | null;
}

export interface CellRendererParams {
  buttons: Array<ButtonConfig> | undefined;
  onClick: (event: any) => void;
}

export interface ButtonConfig {
  label: string;
  action: string;
  colorBtn?: string;
  type?: NzButtonType;
  icon?: string;
  isDisabled?: boolean | ((item: any) => boolean);
  isHidden?: (item: any) => boolean;
}

export interface TableColumn {
  headerName: string;
  key: string;
  cellRenderer?: (item: any) => SafeHtml | null | string | TemplateRef<any>;
  cellRendererParams?: CellRendererParams;
  valueFormatter?: (item: any) => string;
  setClass?: (item: any) => string;
  actionButtons?: Type<any>;
  sortable?: boolean;
  sortDirections?: string[];
  width?: string | null;
  tooltip?: string;
  tooltipValueGetter?: (item: any) => string;
}

export interface ItemData {
  checked?: false;
  expand?: boolean;
}
