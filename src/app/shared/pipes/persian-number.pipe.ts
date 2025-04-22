import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'persianNumber',
  standalone: true,
})
export class PersianNumberPipe implements PipeTransform {
  transform(value: number | string | null | undefined): string | null {
    if (value === null || !value) {
      return null;
    }

    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return value
      .toString()
      .replace(/\d/g, (digit: any) => persianDigits[digit]);
  }
}
