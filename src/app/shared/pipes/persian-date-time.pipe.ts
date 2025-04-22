import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment-jalaali';

@Pipe({
  standalone: true,
  name: 'persianDateTime',
})
export class PersianDateTimePipe implements PipeTransform {
  transform(date?: string): string {
    if (!date) return '';
    const utcDate = moment.utc(date, 'YYYY-MM-DD HH:mm:ss');
    const iranDate = utcDate.utcOffset('+03:30');
    return iranDate.format('jYYYY/jMM/jDD ساعت HH:mm:ss');
  }
}
