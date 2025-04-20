import { Component, inject, OnInit } from '@angular/core';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import {
  NzFormControlComponent,
  NzFormItemComponent,
  NzFormLabelComponent,
} from 'ng-zorro-antd/form';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { IManagementCommentResponseModel } from '../../interfaces/management-comments.model';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { PersianDatePipe } from '../../pipes/persian-date.pipe';
import { FormsModule } from '@angular/forms';
import { ProductCommentRatingLabel } from '@core/enums/product-comment-rating';

@Component({
  selector: 'admin-view-comment-information-dialog',
  imports: [
    NzRowDirective,
    NzColDirective,
    NzFormControlComponent,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzInputDirective,
    NzRateModule,
    PersianDatePipe,
    FormsModule,
  ],
  templateUrl: './view-comment-information-dialog.component.html',
  styleUrl: './view-comment-information-dialog.component.scss',
})
export class ViewCommentInformationDialogComponent implements OnInit {
  readonly nzModalData = inject(NZ_MODAL_DATA);
  data!: IManagementCommentResponseModel;

  tooltips = Object.values(ProductCommentRatingLabel);

  constructor() {}

  ngOnInit() {
    this.data = this.nzModalData.data;
  }

  format(disadvantages: string[]): string {
    if (!Array.isArray(disadvantages)) {
      return '';
    }
    return disadvantages.map((item) => '● ' + item).join('\n');
  }
}
