import {Component, DestroyRef, EventEmitter, OnInit, Output} from '@angular/core';
import {NzCollapseComponent, NzCollapsePanelComponent} from "ng-zorro-antd/collapse";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from "ng-zorro-antd/form";
import {NzInputDirective} from "ng-zorro-antd/input";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatFormField, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {distinctUntilChanged} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'admin-comments-search',
  imports: [
    NzCollapseComponent,
    NzCollapsePanelComponent,
    ReactiveFormsModule,
    NzRowDirective,
    NzColDirective,
    NzFormControlComponent,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzInputDirective,
    NzOptionComponent,
    NzSelectComponent,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatFormField,
    MatInput,
    MatSuffix,
    NzButtonComponent,
    NzFormDirective,
  ],
  templateUrl: './comments-search.component.html',
  styleUrl: './comments-search.component.scss'
})
export class CommentsSearchComponent implements OnInit {
  form!: FormGroup;
  @Output() filterChanged = new EventEmitter<any>();

  constructor( private fb: FormBuilder,
               private destroyRef: DestroyRef,) {
  }

  ngOnInit() {
    this.initForm();
    this.filterReports();

    this.form.controls['IsBuyer'].valueChanges
      .pipe(distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.filterReports();
      });

    this.form.controls['IsAllowedToShow'].valueChanges
      .pipe(distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.filterReports();
      });

    this.form.controls['FromCreateDate'].valueChanges
      .pipe(distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.filterReports();
      });
    this.form.controls['ToCreateDate'].valueChanges
      .pipe(distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.filterReports();
      });
  }

  initForm() {
    this.form = this.fb.group({
      SearchQuery: [null],
      IsBuyer: [null],
      IsAllowedToShow: [null],
      FromCreateDate: [null],
      ToCreateDate: [null],
    });
  }

  resetForm(): void {
    this.form.reset();
    this.filterReports();
  }

  filterReports(event?: Event): void {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }

    let filter: any[] = [];
    Object.keys(this.form.controls).forEach((key) => {
      let value = this.form.controls[key].value;
      if (value != undefined || value == 0)
        filter.push({
          key: key,
          value: value instanceof Date ? new Date(value).toUTCString() : value,
        });
    });
    this.filterChanged.emit(filter);
  }



  onDateChange(event: any) {
    let selectedDate = new Date(event.value);
    selectedDate.setHours(12, 0, 0, 0);
    this.form.get('fromRegisterDate')?.setValue(selectedDate);
  }

  fromDateChange(event: any) {
    let selectedDate = new Date(event.value);
    selectedDate.setHours(12, 0, 0, 0);
    this.form.get('toRegisterDate')?.setValue(selectedDate);
  }

}
