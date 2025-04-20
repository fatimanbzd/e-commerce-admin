import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import {
  NzFormControlComponent,
  NzFormDirective,
  NzFormItemComponent,
  NzFormLabelComponent,
} from 'ng-zorro-antd/form';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { OnlyNumberDirective } from '@core/directives/only-number.directive';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { VendorService } from '../../../services/vendor.service';
import { ToastrService } from 'ngx-toastr';
import { DateAdapter } from '@angular/material/core';
import { faIR } from 'date-fns/locale';
import { Utilities } from '@core/Utils/utilities';

@Component({
  selector: 'vendor-company-info',
  imports: [
    NzButtonComponent,
    NzColDirective,
    NzFormControlComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzInputDirective,
    NzRowDirective,
    OnlyNumberDirective,
    ReactiveFormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './vendor-company-info.component.html',
  styleUrl: './vendor-company-info.component.scss',
})
export class VendorCompanyInfoComponent implements OnInit, OnDestroy {
  validateForm: FormGroup<{
    organizationName: FormControl<string | null>;
    companyEconomicCode: FormControl<string | null>;
    companyClassCode: FormControl<string | null>;
    vendorTitle: FormControl<string | null>;
  }> = this.fb.group({
    organizationName: ['', Validators.required],
    companyEconomicCode: [
      '',
      Validators.required,
      Validators.maxLength(12),
      Validators.minLength(12),
    ],
    companyClassCode: ['', Validators.required],
    vendorTitle: ['', Validators.required],
  });

  loading: boolean = false;
  private _destroy = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private companyService: VendorService,
    private toaster: ToastrService,
    private _adapter: DateAdapter<any>,
  ) {
    this._adapter.setLocale(faIR);
  }

  ngOnInit() {
    this.getCompany();
  }

  submit(form: FormGroup) {
    if (form.invalid) {
      Utilities.checkValidation(form);
    } else {
      this.loading = true;
      this.companyService
        .updateCompany(form.value)
        .pipe(takeUntil(this._destroy))
        .subscribe({
          next: () => {
            this.toaster.success('اطلاعات با موفقیت بروزرسانی شد.');
            this.loading = false;
          },
          error: () => {
            this.loading = false;
          },
        });
    }
  }

  getCompany() {
    this.companyService
      .getCompany()
      .pipe(takeUntil(this._destroy))
      .subscribe({
        next: (res) => {
          this.validateForm.patchValue(res);
        },
      });
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
