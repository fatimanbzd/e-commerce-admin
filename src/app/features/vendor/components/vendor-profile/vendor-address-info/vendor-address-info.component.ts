import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators,} from '@angular/forms';
import {VendorService} from '../../../services/vendor.service';
import {forkJoin, Subject, takeUntil} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent,} from 'ng-zorro-antd/form';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {OnlyNumberDirective} from '../../../../../shared/directives/only-number.directive';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {ProvinceService} from '../../../../../shared/services/province.service';
import {IProvincesModel} from '../../../../../shared/interfaces/province.model';
import {ICityModel} from '../../../../../shared/interfaces/cities.model';
import {FormValidation} from '../../../../../shared/Utils/validators/form-validation';

@Component({
  selector: 'admin-vendor-address-info',
  imports: [
    FormsModule,
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
    NzSelectComponent,
    NzOptionComponent,
  ],
  templateUrl: './vendor-address-info.component.html',
  styleUrl: './vendor-address-info.component.scss',
})
export class VendorAddressInfoComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  private _destroy = new Subject<void>();
  loading: boolean = false;
  provinceList: IProvincesModel[] = [];
  cityList: ICityModel[] = [];

  constructor(
    private fb: FormBuilder,
    private addressService: VendorService,
    private provinceService: ProvinceService,
    private toaster: ToastrService,
  ) {
  }

  ngOnInit() {
    this.initForm();
    this.initialData();
    this.form.get('provinceCode')?.valueChanges.subscribe((value) => {
      this.getCities(value);
    });
  }

  initForm() {
    this.form = this.fb.group({
      provinceCode: [null, Validators.required],
      cityCode: ['', Validators.required],
      postalCode: [
        '',
        [Validators.required, Validators.maxLength(10), Validators.minLength(10)],
      ],
      address: ['', Validators.required],
    });

  }

  initialData() {
    forkJoin([
      this.addressService.getAddress(),
      this.provinceService.getProvince(),
    ])
      .pipe(takeUntil(this._destroy))
      .subscribe(([address, provinces]) => {
        this.provinceList = provinces;
        this.form.patchValue({...address});
      });
  }

  getCities(provinceCode: number) {
    this.form.controls['cityCode'].setValue('');
    if (provinceCode) {
      this.provinceService
        .getCities(provinceCode)
        .pipe(takeUntil(this._destroy))
        .subscribe((cities) => (this.cityList = cities));
    }
  }

  submit(form: FormGroup) {
    if (form.invalid) {
      FormValidation.checkValidation(form);
    } else {
      this.loading = true;
      this.addressService
        .updateAddress(form.value)
        .pipe(takeUntil(this._destroy))
        .subscribe({
          next: () => {
            this.toaster.success('اطلاعات با موفقیت ثبت شد.');
            this.loading = false;
          },
          error: () => {
            this.loading = false;
          },
        });
    }
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
