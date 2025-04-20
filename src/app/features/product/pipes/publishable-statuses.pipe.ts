import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'publishableStatuses',
})
export class publishableStatuses implements PipeTransform {
  transform(value: any): any {
    switch (value) {
      case null:
        return 'در انتظار انتشار';
      case true:
        return 'منتشر شده';
      case false:
        return 'منتشر نشده';
    }

    return '-';
  }
}
