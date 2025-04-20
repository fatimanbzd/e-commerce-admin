import {
  Component,
  DestroyRef,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
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
import { NzInputDirective } from 'ng-zorro-antd/input';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzOptionComponent, NzSelectComponent } from 'ng-zorro-antd/select';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import { MatFormField, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { distinctUntilChanged } from 'rxjs';
import { EnumConvertorUtils } from '@core/Utils/EnumConvertoModel';
import { InvoiceStatusLabel } from '@core/enums/invoice-status.enum';
import { RoleUtil } from '../../../../shared/utilities/role-base';
import { OrderService } from '../../services/order.service';
import { IVendorsModel } from '../../interfaces/vendors.model';
import { PersianToEnglishNumberPipe } from '../../pipes/persianToEnglish.pipe';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { OnlyNumberDirective } from '@core/directives/only-number.directive';

@Component({
  selector: 'admin-order-search',
  imports: [
    NzColDirective,
    NzCollapseComponent,
    NzCollapsePanelComponent,
    NzFormControlComponent,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzInputDirective,
    NzRowDirective,
    ReactiveFormsModule,
    NzFormDirective,
    NzButtonComponent,
    NzOptionComponent,
    NzSelectComponent,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatFormField,
    MatInput,
    MatSuffix,
    PersianToEnglishNumberPipe,
    OnlyNumberDirective,
  ],
  templateUrl: './order-search.component.html',
  styleUrl: './order-search.component.scss',
})
export class OrderSearchComponent implements OnInit {
  isAdmin = false;
  form!: FormGroup;
  vendors: IVendorsModel[] = [];
  @Output() filterChanged = new EventEmitter<any>();

  paymentStatus = [
    { value: null, name: 'همه' },
    { value: false, name: 'پرداخت نشده' },
    {
      value: true,
      name: 'پرداخت شده',
    },
  ];
  invoiceStatusList = EnumConvertorUtils.enumToListModel(InvoiceStatusLabel);

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private destroyRef: DestroyRef,
  ) {
    this.isAdmin = RoleUtil.isAdmin();
  }

  ngOnInit() {
    this.initForm();
    this.filterOrder();
    this.getVendors();
    this.form.controls['paid'].valueChanges
      .pipe(distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.filterOrder();
      });
    this.form.controls['vendorIds'].valueChanges
      .pipe(distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.filterOrder();
      });
    this.form.controls['invoiceStates'].valueChanges
      .pipe(distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.filterOrder();
      });
    this.form.controls['fromRegisterDate'].valueChanges
      .pipe(distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.filterOrder();
      });
    this.form.controls['toRegisterDate'].valueChanges
      .pipe(distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.filterOrder();
      });
  }

  initForm() {
    this.form = this.fb.group({
      customerFullName: [null],
      invoiceNumber: [null],
      paid: [null],
      invoiceStates: [null],
      vendorIds: [null],
      productTitle: [null],
      fromRegisterDate: [null],
      toRegisterDate: [null],
    });
  }

  resetForm(): void {
    this.form.reset();
    this.filterOrder();
  }

  filterOrder(event?: Event): void {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }

    let filter: any[] = [];
    Object.keys(this.form.controls).forEach((key) => {
      let value = this.form.controls[key].value;
      if (key === 'invoiceNumber' && value) {
        value = this.transformToEnglishNumber(value);
      }
      if (value != undefined || value == 0)
        filter.push({
          key: key,
          value: value instanceof Date ? new Date(value).toUTCString() : value,
        });
    });
    this.filterChanged.emit(filter);
  }

  transformToEnglishNumber(value: string): string {
    const pipe = new PersianToEnglishNumberPipe();
    return <string>pipe.transform(value);
  }

  getVendors() {
    this.orderService
      .getVendor()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((vendors) => (this.vendors = vendors));
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
