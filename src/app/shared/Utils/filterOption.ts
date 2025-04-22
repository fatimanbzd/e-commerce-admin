import { HttpParams } from '@angular/common/http';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

export class FilterOptionUtils {
  static getHttpParams(
    pageIndex: number,
    pageSize: number,
    sortField: string | null | undefined,
    sortOrder: string | null | undefined,
    filters: Array<{
      key: string;
      value: string[] | string | number | boolean | number[] | null;
    }>,
  ) {
    let params = new HttpParams()
      .set('pageSize', `${pageSize}`)
      .set('PageNumber', `${pageIndex}`);
    if (sortField) params = params.set('orderBy', `${sortField}`);
    if (sortOrder) params = params.set('IsAsc', `${sortOrder === 'ascend'}`);
    if (filters?.length)
      filters?.forEach((filter) => {
        if (
          filter.value !== null &&
          typeof filter.value !== undefined &&
          filter.value !== ''
        ) {
          if (Array.isArray(filter.value))
            filter.value.forEach((value) => {
              params = params.append(filter.key, value);
            });
          else params = params.set(filter.key, filter.value);
        }
      });
    return params;
  }

  static getHttpParams2(model: NzTableQueryParams) {
    let params = new HttpParams()
      .set('pageSize', model.pageSize)
      .set('PageNumber', model.pageIndex);
    if (model.sort)
      model.sort.forEach((item) => {
        params = params.set('orderBy', `${item.key}`);
        params = params.set('IsAsc', `${item.value === 'ascend'}`);
      });

    model.filter?.forEach((filter) => {
      if (
        filter.value !== null &&
        typeof filter.value !== undefined &&
        filter.value !== ''
      ) {
        const value = filter.value;
        if (value instanceof Date) {
          params = params.set(filter.key, new Date(value).toDateString());
        } else if (Array.isArray(value))
          value.forEach((item) => {
            params = params.set(item, value[item]);
          });
        else if (typeof value === 'object')
          params = params.set(filter.key, JSON.stringify(value));
        else params = params.set(filter.key, value);
      }
    });

    return params;
  }
}
