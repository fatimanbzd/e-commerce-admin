import { Pipe, PipeTransform } from '@angular/core';
import 'moment/locale/fa';
import moment from 'moment';
import 'moment/locale/fa';

@Pipe({
  name: 'relativeTime',
})
export class RelativeTimePipe implements PipeTransform {
  transform(value: string | Date | number): string {
    if (!value) {
      return '';
    }

    moment.locale('fa');
    return moment(value).fromNow();
  }
}
