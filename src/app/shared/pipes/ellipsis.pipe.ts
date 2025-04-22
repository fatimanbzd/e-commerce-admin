import { Pipe, PipeTransform } from '@angular/core';
import { SlicePipe } from '@angular/common';

@Pipe({
  name: 'ellipsis',
  standalone: true,
})
export class EllipsisPipe implements PipeTransform {
  transform(value: string, maxLength: number): any {
    const suffix = value && value.length > maxLength ? '...' : '';
    return new SlicePipe().transform(value, 0, maxLength) + suffix;
  }
}
