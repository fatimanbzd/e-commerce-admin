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
import { OnlyNumberDirective } from '@core/directives/only-number.directive';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { VendorService } from '../../../services/vendor.service';
import { ToastrService } from 'ngx-toastr';
import { Utilities } from '@core/Utils/utilities';
import { IVendorContactModel } from '../../../interfaces/vendor-contact.model';

@Component({
  selector: 'admin-vendor-contact-info',
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
  templateUrl: './vendor-contact-info.component.html',
  styleUrl: './vendor-contact-info.component.scss',
})
export class VendorContactInfoComponent implements OnInit, OnDestroy {
  validateForm!: FormGroup;
  private _destroy = new Subject<void>();
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private contactService: VendorService,
    private toaster: ToastrService,
  ) {}

  ngOnInit() {
    this.initForm();
    this.getContact();
  }

  initForm() {
    this.validateForm = this.fb.group({
      agentName: [null, Validators.required],
      agentFamily: [null, Validators.required],
      email: [null, Validators.email],
      phoneNumber: [
        null,
        [
          Validators.required,
          Validators.maxLength(11),
          Validators.minLength(11),
        ],
      ],
      agentMobileNumber: [
        null,
        [
          Validators.required,
          Validators.maxLength(11),
          Validators.minLength(11),
        ],
      ],
      siteUrl: null,
      storeDescription: [null],
    });
  }
  getContact() {
    this.contactService
      .getContact()
      .pipe(takeUntil(this._destroy))
      .subscribe((contact) =>
        this.validateForm.patchValue({
          ...contact,
        }),
      );
  }

  submit(form: FormGroup) {
    if (form.invalid) {
      Utilities.checkValidation(form);
    } else {
      const vendorContactModel: IVendorContactModel = {
        agentName: form.value.agentName,
        agentFamily: form.value.agentFamily,
        phoneNumber: form.value.phoneNumber,
        agentMobileNumber: form.value.agentMobileNumber,
        email: form.value.email === '' ? null : form.value.email,
        siteUrl: form.value.siteUrl === '' ? null : form.value.siteUrl,
        storeDescription:
          form.value.storeDescription === ''
            ? null
            : form.value.storeDescription,
      };
      this.loading = true;
      this.contactService
        .updateContact(vendorContactModel)
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
