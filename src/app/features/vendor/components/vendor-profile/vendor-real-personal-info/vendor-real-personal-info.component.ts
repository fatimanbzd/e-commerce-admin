import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import {
  NzFormControlComponent,
  NzFormDirective,
  NzFormItemComponent,
  NzFormLabelComponent,
} from 'ng-zorro-antd/form';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { OnlyNumberDirective } from '../../../../../shared/directives/only-number.directive';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { map, Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { VendorService } from '../../../services/vendor.service';
import { IVendorCompanyModel } from '../../../interfaces/vendor-company.model';
import {FormValidation} from '../../../../../shared/Utils/validators/form-validation';

@Component({
  selector: 'vendor-real-personal-info',
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
  templateUrl: './vendor-real-personal-info.component.html',
  styleUrl: './vendor-real-personal-info.component.scss',
})
export class VendorRealPersonalInfoComponent implements OnInit, OnDestroy {
  validateForm!: FormGroup;
  loading: boolean = false;
  private _destroy = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private companyService: VendorService,
    private toaster: ToastrService,
  ) {}

  ngOnInit() {
    this.initForm();
    this.getCompany();
  }

  initForm() {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      family: ['', [Validators.required]],
      vendorTitle: ['', [Validators.required]],
      companyClassCode: ['', [Validators.required]],
      companyEconomicCode: [
        '',
        [
          Validators.required,
          Validators.maxLength(12),
          Validators.minLength(12),
        ],
      ],
    });
  }

  submit(form: FormGroup) {
    if (form.invalid) {
      FormValidation.checkValidation(form);
      return;
    }

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

  getCompany() {
    this.companyService
      .getCompany()
      .pipe(
        map(
          (co) =>
            ({
              name: co.name,
              family: co.family,
              companyClassCode: co.companyClassCode,
              companyEconomicCode: co.companyEconomicCode,
              vendorTitle: co.vendorTitle,
            }) as Partial<IVendorCompanyModel>,
        ),
        takeUntil(this._destroy),
      )
      .subscribe({
        next: (company) => {
          if (company) this.validateForm.patchValue({ ...company });
        },
        error: (error) => console.error('Error fetching company:', error),
      });
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
