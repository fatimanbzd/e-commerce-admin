import { Inject, Pipe, PipeTransform } from '@angular/core';
import {IEnvironmentModel} from '../interfaces/environment.model';

@Pipe({
  name: 'fullSrc',
  standalone: true,
})
export class FullSrcPipe implements PipeTransform {
  constructor(@Inject('environment') private environment: IEnvironmentModel) {}
  transform(value: string): string {
    return value ? `${this.environment.apiUrl}${value}` : value;
  }
}
