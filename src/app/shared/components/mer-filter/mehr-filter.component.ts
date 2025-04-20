import {
  AfterViewInit,
  Component,
  ContentChild,
  Input,
  Output,
} from '@angular/core';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzButtonComponent, NzButtonSize } from 'ng-zorro-antd/button';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { FormGroupDirective, NgForm } from '@angular/forms';

@Component({
  selector: 'mehr-filter',
  imports: [NzIconDirective, NzButtonComponent],
  templateUrl: './mehr-filter.component.html',
  styleUrl: './mehr-filter.component.scss',
  animations: [
    trigger('openClose', [
      state(
        'true',
        style({ opacity: 1, zIndex: 2, transform: 'translateY(10%)' }),
      ),
      state('false', style({ opacity: 0, transform: 'translateY(0%)' })),
      transition('false <=> true', animate('700ms ease-in-out')),
    ]),
  ],
})
export class MehrFilterComponent implements AfterViewInit {
  showFilters = false;

  @Input() size: NzButtonSize = 'large';
  @ContentChild(FormGroupDirective) formDirective!: FormGroupDirective;
  @Output()
  ngAfterViewInit() {
    console.log(this.formDirective);
    if (this.formDirective) {
      this.formDirective.form.valueChanges.subscribe((values) => {});
    }
  }
}
