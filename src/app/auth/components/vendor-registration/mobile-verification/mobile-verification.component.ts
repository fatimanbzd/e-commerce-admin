import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators,} from '@angular/forms';
import {OnlyNumberDirective} from '../../../../shared/directives/only-number.directive';
import {ToastrService} from 'ngx-toastr';
import {finalize, Subject, takeUntil} from 'rxjs';
import {VendorAuthService} from '../../../services/vendor-auth.service';
import {IVendorRegisterModel, IVendorRequestRegisterModel,} from '../../../interfaces/vendor-request-register.model';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent,} from 'ng-zorro-antd/form';
import {NzInputDirective, NzInputGroupComponent} from 'ng-zorro-antd/input';
import {NzRadioComponent, NzRadioGroupComponent} from 'ng-zorro-antd/radio';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {VendorTypeEnum, VendorTypeLabel,} from '../../../enums/vendor-type.enum';
import {Router, RouterLink} from '@angular/router';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {EnumConvertorUtils} from '../../../../shared/Utils/EnumConvertoModel';

@Component({
  selector: 'vendor-mobile-verification',
  imports: [
    ReactiveFormsModule,
    OnlyNumberDirective,
    NzColDirective,
    NzFormControlComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzInputDirective,
    NzRadioComponent,
    NzRadioGroupComponent,
    NzInputGroupComponent,
    NzButtonComponent,
    NzRowDirective,
    FormsModule,
    NzSpinComponent,
    RouterLink,
  ],
  templateUrl: './mobile-verification.component.html',
  styleUrl: './mobile-verification.component.scss',
})
export class MobileVerificationComponent implements OnInit, OnDestroy {
  submitted = false;
  displayTimer!: string;
  gettingOtp = false;
  vendorTypeList = EnumConvertorUtils.customEnumToModelList(
    [VendorTypeEnum.real, VendorTypeEnum.legal],
    VendorTypeLabel,
  );
  validateForm!: FormGroup;
  @Output() confirmedMobile = new EventEmitter();
  private _destroy = new Subject<void>();

  constructor(
    private fb: NonNullableFormBuilder,
    private authService: VendorAuthService,
    private toastrService: ToastrService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.validateForm = this.fb.group({
      vendorType: [VendorTypeEnum.legal],
      mobileNumber: [
        null,
        [
          Validators.required,
          Validators.pattern(
            '^(?:(?:(?:\\\\+?|00)(98))|(0))?((?:90|91|92|93|99)[0-9]{8})$',
          ),
          Validators.maxLength(11),
        ],
      ],
      nationalNumber: [
        null,
        [Validators.required, Validators.maxLength(10), Validators.minLength(10)],
      ],
      verificationCode: [null, Validators.required],
    });
  }

  submit(form: any): void {
    this.submitted = true;
    if (this.validateForm.invalid) {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
      return;
    }

    const model: IVendorRegisterModel = {
      mobileNumber: form.value.mobileNumber,
      vendorType: form.value.vendorType,
      nationalNumber: form.value.nationalNumber,
      verificationCode: form.value.verificationCode,
    };

    this.authService
      .register(model)
      .pipe(
        takeUntil(this._destroy),
        finalize(() => (this.submitted = false)),
      )
      .subscribe({
        next: () => {
          this.toastrService.success('ثبت نام با موفقیت انجام شد.');
          this.router.navigateByUrl('/login');
        },
      });
  }

  getOtp(mobileNumber: string | null) {
    if (!mobileNumber) {
      const mobileFormControl = this.validateForm.controls['mobileNumber'];
      mobileFormControl.markAsDirty();
      mobileFormControl.updateValueAndValidity({onlySelf: true});
      return;
    }
    this.gettingOtp = true;
    this.authService
      .mobileVerification({
        mobileNumber: mobileNumber,
      } as IVendorRequestRegisterModel)
      .pipe(
        takeUntil(this._destroy),
        finalize(() => (this.gettingOtp = false)),
      )
      .subscribe({
        next: (time) => {
          this.timer(time.waitTime);
          this.toastrService.success('رمز یکبارمصرف ارسال شد.');
        },
      });
  }

  private timer(seconds: number) {
    const interval = 1000; // Interval in milliseconds
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;

    const formatNumber = (num: number): string =>
      num < 10 ? `0${num}` : `${num}`;

    const updateTimer = () => {
      const displayMinutes = formatNumber(minutes);
      const displaySeconds = formatNumber(remainingSeconds);

      this.displayTimer = `${displayMinutes}:${displaySeconds}`;

      if (seconds <= 0) {
        this.displayTimer = '';
        clearInterval(timerId);
      } else {
        seconds--;
        if (remainingSeconds > 0) {
          remainingSeconds--;
        } else {
          minutes--;
          remainingSeconds = 59;
        }
      }
    };
    updateTimer(); // Initial update

    const timerId = setInterval(updateTimer, interval); // Start timer

    return timerId;
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
