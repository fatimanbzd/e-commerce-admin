import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'empty',
})
export class empty implements PipeTransform {
  transform(value: any): any {
    if (value === null || value === undefined || value === '') {
      return '-';
    }
    return value;
  }
}
