import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumLabel',
  standalone: true,
})
export class EnumLabelPipe implements PipeTransform {
  transform(value: any, labelMapping: Record<number, string>): string {
    return labelMapping[value];
  }
}
