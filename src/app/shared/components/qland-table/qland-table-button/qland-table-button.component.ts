import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NgClass, NgStyle } from '@angular/common';
import { ButtonConfig } from '../../../interfaces/qland-table.model';
import {
  NzDropDownDirective,
  NzDropdownMenuComponent,
} from 'ng-zorro-antd/dropdown';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import {
  NzMenuDirective,
  NzMenuDividerDirective,
  NzMenuItemComponent,
} from 'ng-zorro-antd/menu';
import { NzTypographyComponent } from 'ng-zorro-antd/typography';

@Component({
  selector: 'qland-table-button',
  imports: [
    NzButtonComponent,
    NgStyle,
    NgClass,
    NzDropDownDirective,
    NzIconDirective,
    NzDropdownMenuComponent,
    NzMenuDirective,
    NzMenuItemComponent,
    NzTypographyComponent,
    NzMenuDividerDirective,
  ],
  templateUrl: './qland-table-button.component.html',
  styleUrl: './qland-table-button.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class QlandTableButtonComponent implements OnInit {
  @Input() item: any;
  @Input() buttons: Array<ButtonConfig> | undefined = undefined;
  @Output() buttonClick = new EventEmitter<any>();
  @Input() isDisabled = false;

  ngOnInit() {
    this.buttons = this.buttons ?? [];
  }

  onButtonClick(action: string): void {
    this.buttonClick.emit({ action, rowData: this.item });
  }

  evaluateIsDisabled(item: any, button: any): boolean {
    if (typeof button.isDisabled === 'function') {
      return button.isDisabled(item);
    }
    return !!button.isDisabled;
  }

  evaluateIsHidden(item: any, button: any): boolean {
    if (typeof button.isHidden === 'function') {
      return button.isHidden(item);
    }
    return false;
  }
}
