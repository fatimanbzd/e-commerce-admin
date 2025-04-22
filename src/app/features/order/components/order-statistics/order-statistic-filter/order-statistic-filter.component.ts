import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import { NzRadioComponent, NzRadioGroupComponent } from 'ng-zorro-antd/radio';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatSuffix } from '@angular/material/form-field';
import { NzFormLabelComponent } from 'ng-zorro-antd/form';
import { MatInput } from '@angular/material/input';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { EnumConvertorUtils } from '../../../../../shared/Utils/EnumConvertoModel';
import { ReportDatePartLabel } from '../../../enums/report-date-part-enum';
import { IOrderStatisticFilterModel } from '../../../interfaces/order-statistic.model';

@Component({
  selector: 'admin-order-statistic-filter',
  imports: [
    MatDatepicker,
    NzRadioGroupComponent,
    NzRowDirective,
    FormsModule,
    NzColDirective,
    MatFormField,
    MatDatepickerToggle,
    NzFormLabelComponent,
    MatInput,
    MatDatepickerInput,
    NzIconDirective,
    NzRadioComponent,
    MatSuffix,
  ],
  templateUrl: './order-statistic-filter.component.html',
  styleUrl: './order-statistic-filter.component.scss',
})
export class OrderStatisticFilterComponent implements OnInit {
  times = EnumConvertorUtils.enumToListModel(ReportDatePartLabel);
  filter: Partial<IOrderStatisticFilterModel> = { datePart: 0 };
  @Output() filtered = new EventEmitter<Partial<IOrderStatisticFilterModel>>();

  ngOnInit() {
    this.filtered.emit(this.filter);
  }

  filterPerDate(filterModel: Partial<IOrderStatisticFilterModel> | null) {
    let model: Partial<IOrderStatisticFilterModel> = {};

    if (filterModel?.fromDate || filterModel?.toDate) {
      this.filter.datePart = undefined;
      if (filterModel?.fromDate) {
        let selectedDate = new Date(filterModel?.fromDate);
        selectedDate.setHours(12, 0, 0, 0);
        model.fromDate = selectedDate.toUTCString();
      }
      if (filterModel?.toDate) {
        let selectedDate = new Date(filterModel?.toDate);
        selectedDate.setHours(12, 0, 0, 0);
        model.toDate = selectedDate.toUTCString();
      }
    } else {
      this.filter.fromDate = undefined;
      this.filter.toDate = undefined;
      model.datePart = filterModel?.datePart;
    }
    this.filtered.emit(model);
  }

  resetFromDateInput() {
    let model: Partial<IOrderStatisticFilterModel> = {};
    this.filter.fromDate = undefined;
    if (!this.filter.toDate) this.filter.datePart = 0;
    else {
      let toDate = new Date(this.filter?.toDate);
      toDate.setHours(12, 0, 0, 0);
      model.toDate = toDate.toUTCString();
    }
    this.filtered.emit(model);
  }

  resetToDateInput = () => {
    let model: Partial<IOrderStatisticFilterModel> = {};

    this.filter.toDate = undefined;
    if (!this.filter.fromDate) this.filter.datePart = 0;
    else {
      let fromDate = new Date(this.filter?.fromDate);
      fromDate.setHours(12, 0, 0, 0);
      model.fromDate = fromDate.toUTCString();
    }
    this.filtered.emit(model);
  };
}
