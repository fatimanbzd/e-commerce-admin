import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'orderStatus',
})
export class orderStatus implements PipeTransform {
  transform(value: any): any {
    switch (value) {
      case true:
        return 'پرداخت شده';
      case false:
        return 'پرداخت نشده';
    }

    return '-';
  }
}
