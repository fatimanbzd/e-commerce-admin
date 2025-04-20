import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'persianToEnglishNumber',
  standalone: true,
})
export class PersianToEnglishNumberPipe implements PipeTransform {
  transform(value: string | null): string | null {
    if (value === null || !value) {
      return null;
    }

    const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

    return value.replace(
      /[۰-۹]/g,
      (digit) => englishDigits[persianDigits.indexOf(digit)],
    );
  }
}
