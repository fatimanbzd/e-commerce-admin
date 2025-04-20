import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterGridService {
  private _setFilterRequestCallSubject = new Subject<any[]>();
  getFilterRequestCall$ = this._setFilterRequestCallSubject.asObservable();

  constructor() {}

  setFilterRequestCall(formModel: any) {
    const filterArray = this.convertObjectToArray(formModel);
    this._setFilterRequestCallSubject.next(filterArray);
  }

  private convertObjectToArray(formValue: any): any[] {
    let filters: Array<any> = [];
    Object.keys(formValue).forEach((key: string) => {
      filters.push({ key: key, value: formValue[key] });
    });
    return filters;
  }
}
