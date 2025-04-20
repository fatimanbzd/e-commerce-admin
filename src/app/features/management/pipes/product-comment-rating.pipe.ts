import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'productCommentRating',
})
export class productCommentRating implements PipeTransform {
  transform(value: any): any {
    switch (value) {
      case 0:
        return 'خیلی بد';
      case 1:
        return 'بد';
      case 2:
        return 'متوسط';
      case 3:
        return 'خوب';
      case 4:
        return 'خیلی خوب';
    }

    return '-';
  }
}
