import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  NzFormControlComponent,
  NzFormDirective,
  NzFormItemComponent,
  NzFormLabelComponent,
} from 'ng-zorro-antd/form';
import {NzInputDirective, NzInputGroupComponent} from 'ng-zorro-antd/input';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {ILoginModel} from '../../interfaces/login.model';
import {AuthService} from '../../../shared/services/auth.service';
import {RouterLink} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
import {concatMap, map, Subject, takeUntil} from 'rxjs';
import {NzRadioComponent, NzRadioGroupComponent} from 'ng-zorro-antd/radio';
import {NzIconDirective, NzIconModule} from 'ng-zorro-antd/icon';
import {UserTypeEnum, UserTypeLabel} from '../../../shared/enums/user-type.enum';
import {EnumConvertorUtils} from '../../../shared/Utils/EnumConvertoModel';

@Component({
  selector: 'app-login',
  imports: [
    NzFormItemComponent,
    NzFormControlComponent,
    NzInputGroupComponent,
    NzColDirective,
    NzButtonComponent,
    ReactiveFormsModule,
    NzFormDirective,
    NzInputDirective,
    NzRowDirective,
    RouterLink,
    NgOptimizedImage,
    NzFormLabelComponent,
    NzRadioComponent,
    NzRadioGroupComponent,
    NzIconDirective,
    NzIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  validateForm!: FormGroup;
  userTypeList = EnumConvertorUtils.customEnumToModelList(
    [UserTypeEnum.admin, UserTypeEnum.vendor],
    UserTypeLabel,
  );
  showPass = false;
  private _destroy = new Subject<void>();

  constructor(
    private fb: NonNullableFormBuilder,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.validateForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      userType: [UserTypeEnum.admin, [Validators.required]],
      captchaCode: ['321313', [Validators.required]],
    });

  }

  showPassword() {
    this.showPass = !this.showPass;
  }

  submit(): void {
    if (this.validateForm.valid) {
      this.authService
        .login(this.validateForm.value as ILoginModel)
        .pipe(
          concatMap((auth) => {
            return this.authService
              .currentUser()
              .pipe(map((user) => ({auth, user})));
          }),
          takeUntil(this._destroy),
        )
        .subscribe(({auth, user}) => {
          this.authService.doLoginUser(auth, user);
        });
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
    }
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
