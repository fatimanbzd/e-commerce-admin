import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import { MatFormField, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import {
  NzCollapseComponent,
  NzCollapsePanelComponent,
} from 'ng-zorro-antd/collapse';
import {
  NzFormControlComponent,
  NzFormDirective,
  NzFormItemComponent,
  NzFormLabelComponent,
} from 'ng-zorro-antd/form';
import { FilterGridService } from '../../../../shared/services/filter-grid.service';
import { NzIconDirective } from 'ng-zorro-antd/icon';

@Component({
  selector: 'admin-billing-search',
  imports: [
    FormsModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatFormField,
    MatInput,
    MatSuffix,
    NzButtonComponent,
    NzColDirective,
    NzCollapseComponent,
    NzCollapsePanelComponent,
    NzFormControlComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzRowDirective,
    ReactiveFormsModule,
    NzIconDirective,
  ],
  templateUrl: './billing-search.component.html',
  styleUrl: './billing-search.component.scss',
})
export class BillingSearchComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private filterGridService: FilterGridService,
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      fromDate: [null],
      toDate: [null],
    });
  }

  resetForm(): void {
    this.form.reset();
    this.filterOrder(this.form.value);
  }

  filterOrder(formValue: any): void {
    this.filterGridService.setFilterRequestCall(formValue);
  }

  onFromDateChange(event: any) {
    let selectedDate = new Date(event.target.value);
    selectedDate.setHours(12, 0, 0, 0);
    this.form.get('fromDate')?.setValue(selectedDate);
    this.filterOrder(this.form.value);
  }

  onToDateChange(event: any) {
    let selectedDate = new Date(event.target.value);
    selectedDate.setHours(12, 0, 0, 0);
    this.form.get('toDate')?.setValue(selectedDate);
    this.filterOrder(this.form.value);
  }

  resetDateInput(formName: string) {
    this.form.get(formName)?.reset();
    this.filterOrder(this.form.value);
  }
}
