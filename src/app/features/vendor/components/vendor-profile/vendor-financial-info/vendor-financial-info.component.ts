import { Component, DestroyRef, OnInit } from '@angular/core';
import {
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { VendorService } from '../../../services/vendor.service';
import { ToastrService } from 'ngx-toastr';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import {
  NzFormControlComponent,
  NzFormDirective,
  NzFormItemComponent,
  NzFormLabelComponent,
} from 'ng-zorro-antd/form';
import { NzInputDirective, NzInputGroupComponent } from 'ng-zorro-antd/input';
import { OnlyNumberDirective } from '@core/directives/only-number.directive';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSwitchComponent } from 'ng-zorro-antd/switch';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Utilities } from '@core/Utils/utilities';

@Component({
  selector: 'vendor-financial-info',
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
    NzModalModule,
    NzInputGroupComponent,
    NzSwitchComponent,
  ],
  templateUrl: './vendor-financial-info.component.html',
  styleUrl: './vendor-financial-info.component.scss',
})
export class VendorFinancialInfoComponent implements OnInit {
  validateForm!: FormGroup;

  constructor(
    private fb: NonNullableFormBuilder,
    private vendorService: VendorService,
    private toaster: ToastrService,
    private destroyRef: DestroyRef,
  ) {}

  ngOnInit() {
    this.initForm();
    this.getFinancialInfo();
  }

  initForm() {
    this.validateForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.minLength(16)]],
      shabaNumber: ['', [Validators.required, Validators.minLength(24)]],
      depositNumber: ['', Validators.required],
      ownerFullName: ['', Validators.required],
      haveValueAddedTax: [false],
    });
  }

  getFinancialInfo() {
    this.vendorService
      .getFinancial()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((fin) => {
        this.validateForm.patchValue({ ...fin });
      });
  }

  submit(form: FormGroup) {
    if (form.invalid) {
      Utilities.checkValidation(form);
      return;
    }

    this.vendorService
      .updateFinancial(form.value)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.vendorService.setDocumentUpdated();
          this.toaster.success('اطلاعات با موفقیت بروزرسانی شد.');
        },
      });
  }
}
