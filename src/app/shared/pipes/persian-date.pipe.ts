import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment-jalaali';

@Pipe({
  standalone: true,
  name: 'persianDate',
})
export class PersianDatePipe implements PipeTransform {
  transform(date?: string): string {
    if (!date) return '';
    return moment(date).locale('fa').format('YYYY/MM/DD');
  }
}

