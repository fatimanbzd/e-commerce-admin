import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators,} from '@angular/forms';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzColDirective} from 'ng-zorro-antd/grid';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent,} from 'ng-zorro-antd/form';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NZ_MODAL_DATA, NzModalFooterDirective, NzModalRef,} from 'ng-zorro-antd/modal';
import {VendorService} from '../../services/vendor.service';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle,} from '@angular/material/datepicker';
import {MatFormField} from '@angular/material/form-field';
import {MatInput, MatSuffix} from '@angular/material/input';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzUploadComponent, NzUploadFile} from 'ng-zorro-antd/upload';
import {ToastrService} from 'ngx-toastr';
import {finalize, Subject, takeUntil} from 'rxjs';
import {FormValidation} from '../../../../shared/Utils/validators/form-validation';
import {OnlyNumberDirective} from '../../../../shared/directives/only-number.directive';

@Component({
  selector: 'admin-vendor-contract-dialog',
  imports: [
    FormsModule,
    NzButtonComponent,
    NzColDirective,
    NzFormDirective,
    NzFormItemComponent,
    NzInputDirective,
    ReactiveFormsModule,
    NzModalFooterDirective,
    NzFormControlComponent,
    OnlyNumberDirective,
    NzFormLabelComponent,
    MatInput,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatSuffix,
    MatFormField,
    NzIconDirective,
    NzUploadComponent,
  ],
  templateUrl: './vendor-contract-dialog.component.html',
  styleUrl: './vendor-contract-dialog.component.scss'
})
export class VendorContractDialogComponent implements OnInit, OnDestroy {
  isConfirmLoading = false;
  id!: number;
  form!: FormGroup;
  readonly nzModalData = inject(NZ_MODAL_DATA);
  fileList: NzUploadFile[] = [];
  selectedFile: any | null = null;
  private _destroy = new Subject<void>();

  constructor(
    private modal: NzModalRef,
    private vendorMngService: VendorService,
    private fb: NonNullableFormBuilder,
    private toaster: ToastrService,
  ) {
    this.id = this.nzModalData.id;
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      contractNumber: ['', [Validators.required]],
      contractDate: ['', [Validators.required]],
      expireDate: ['', [Validators.required]],
    });
  }

  handleOk(): void {
    if (this.form.invalid) {
      FormValidation.checkValidation(this.form);
      return;
    }
    this.isConfirmLoading = true;
    if (!this.selectedFile) {
      this.toaster.error('فایل قرارداد را برگزاری کنید.');
      return;
    }

    const formData = new FormData();

    formData.append('contractImage', this.selectedFile);
    formData.append('contractNumber', this.form.value.contractNumber ?? '');
    if (this.form.value.expireDate)
      formData.append(
        'expireDate',
        new Date(this.form.value.expireDate).toUTCString(),
      );

    if (this.form.value.contractDate)
      formData.append(
        'contractDate',
        new Date(this.form.value.contractDate).toUTCString(),
      );

    this.vendorMngService
      .addContract(this.id, formData)
      .pipe(
        takeUntil(this._destroy),
        finalize(() => (this.isConfirmLoading = false)),
      )
      .subscribe({
        next: () => {
          this.modal.close(true);
        },
      });
  }

  beforeUpload = (file: NzUploadFile) => {
    if (this.fileList.length == 0) this.fileList = [file];

    this.selectedFile = file;
    return false;
  };

  handleChange(info: { file: NzUploadFile; fileList: NzUploadFile[] }): void {
    const {file} = info;
    if (file.status === 'done') {
      this.toaster.error('');
    } else if (file.status === 'error') {
      this.toaster.error('');
    }
  }

  handleCancel(): void {
    this.modal.destroy();
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
