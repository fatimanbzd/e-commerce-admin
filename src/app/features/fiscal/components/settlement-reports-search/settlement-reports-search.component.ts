import {
  Component,
  DestroyRef,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
import { NzInputDirective, NzInputGroupComponent } from 'ng-zorro-antd/input';
import { NzOptionComponent, NzSelectComponent } from 'ng-zorro-antd/select';
import { OnlyNumberDirective } from '../../../../shared/directives/only-number.directive';
import {
  VendorBalanceTypeLabel
} from '../../enums/vendor-balance-type.enums';
import { EnumConvertorUtils } from '../../../../shared/Utils/EnumConvertoModel';
import { distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {RoleUtil} from "../../../../shared/Utils/role-base";
import {IEnumModel} from "../../../../shared/interfaces/enum.model";
import {IVendorsModel} from "../../../order/interfaces/vendors.model";
import {OrderService} from "../../../order/services/order.service";

@Component({
    selector: 'admin-settlement-reports-search',
    imports: [
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
        NzInputDirective,
        NzOptionComponent,
        NzRowDirective,
        NzSelectComponent,
        ReactiveFormsModule,
        OnlyNumberDirective,
        NzInputGroupComponent,
    ],
    templateUrl: './settlement-reports-search.component.html',
    styleUrl: './settlement-reports-search.component.scss'
})
export class SettlementReportsSearchComponent implements OnInit {
  @Output() filterChanged = new EventEmitter<any>();
  form!: FormGroup;
  isAdmin = false;
  vendors: IVendorsModel[] = [];

  VendorBalanceType = EnumConvertorUtils.enumToListModel(VendorBalanceTypeLabel,);

  balanceType: IEnumModel<number | string>[] = [];

  constructor(
    private fb: FormBuilder,
    private destroyRef: DestroyRef,
    private orderService: OrderService,
  ) {
    this.isAdmin = RoleUtil.isAdmin();
  }

  ngOnInit() {
    this.initForm();
    this.filterReports();
    this.getVendors();

    this.balanceType = this.isAdmin? this.VendorBalanceType : this.VendorBalanceType.filter(item => item.value !== 40);

    this.form.controls['VendorBalanceTypes'].valueChanges
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

    this.form.controls['VendorIds'].valueChanges
      .pipe(distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.filterReports();
      });
  }

  initForm() {
    this.form = this.fb.group({
      FromAmount: [null],
      ToAmount: [null],
      VendorBalanceTypes: [null],
      Description: [null],
      FromCreateDate: [null],
      ToCreateDate: [null],
      VendorIds: [null],
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


  getVendors() {
    this.orderService
      .getVendor()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((vendors) => (this.vendors = vendors));
  }

  fromDateChange(event: any) {
    let selectedDate = new Date(event.value);
    selectedDate.setHours(12, 0, 0, 0);
    this.form.get('fromRegisterDate')?.setValue(selectedDate);
  }

  toDateChange(event: any) {
    let selectedDate = new Date(event.value);
    selectedDate.setHours(12, 0, 0, 0);
    this.form.get('toRegisterDate')?.setValue(selectedDate);
  }
}
