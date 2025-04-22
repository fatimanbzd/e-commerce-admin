import {Component, OnInit} from '@angular/core';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators,} from '@angular/forms';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent,} from 'ng-zorro-antd/form';
import {NzInputDirective, NzInputGroupComponent} from 'ng-zorro-antd/input';
import {ToastrService} from 'ngx-toastr';
import {NzFlexDirective} from 'ng-zorro-antd/flex';
import {Subject, takeUntil} from 'rxjs';
import {NzRibbonComponent} from 'ng-zorro-antd/badge';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {AuthService} from '../../../../shared/services/auth.service';
import {AccountService} from '../../services/account.service';
import {NzAlertComponent} from 'ng-zorro-antd/alert';
import {IUserModel} from '../../../../auth/interfaces/user.model';
import {FormValidation} from '../../../../shared/Utils/validators/form-validation';

@Component({
  selector: 'admin-change-password',
  imports: [
    NzRowDirective,
    NzColDirective,
    FormsModule,
    NzButtonComponent,
    NzFormControlComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzInputDirective,
    ReactiveFormsModule,
    NzFlexDirective,
    NzRibbonComponent,
    NzIconDirective,
    NzInputGroupComponent,
    NzAlertComponent,
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent implements OnInit {
  user!: IUserModel;
  validateForm!: FormGroup;

  loading: boolean = false;
  showCurrentPass = false;
  showNewPass = false;
  showConfirmNewPass = false;
  private _destroy = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private toaster: ToastrService,
    private authService: AuthService,
  ) {
    this.user = authService.getUserAuthenticated();
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.validateForm = this.fb.group(
      {
        currentPassword: ['', Validators.required],
        newPassword: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}',
            ),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: this.ConfirmedValidator('newPassword', 'confirmPassword'),
      },
    );
  }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors['confirmedValidator']
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({confirmedValidator: true});
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  showPassword(type: string) {
    switch (type) {
      case 'currentPassword':
        this.showCurrentPass = !this.showCurrentPass;
        break;
      case 'newPassword':
        this.showNewPass = !this.showNewPass;
        break;
      case 'confirmPassword':
        this.showConfirmNewPass = !this.showConfirmNewPass;
        break;
    }
  }

  submit(form: FormGroup) {
    if (form.invalid) {
      FormValidation.checkValidation(form);
    } else {
      this.loading = true;
      const data = {
        currentPassword: form.value.currentPassword,
        newPassword: form.value.newPassword,
      };
      this.accountService
        .updatePassword(data)
        .pipe(takeUntil(this._destroy))
        .subscribe({
          next: () => {
            this.toaster.success('اطلاعات با موفقیت ثبت شد.');
            this.authService.logout();

            this.loading = false;
          },
          error: () => {
            this.loading = false;
          },
        });
    }
  }
}
