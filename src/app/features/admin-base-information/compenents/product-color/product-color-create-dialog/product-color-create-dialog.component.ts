import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent,} from 'ng-zorro-antd/form';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators,} from '@angular/forms';
import {NZ_MODAL_DATA, NzModalFooterDirective, NzModalRef,} from 'ng-zorro-antd/modal';
import {ProductColorService} from '../../../services/product-color.service';
import {finalize, Subject, takeUntil} from 'rxjs';
import {NzSwitchComponent} from 'ng-zorro-antd/switch';
import {NzColorPickerComponent} from 'ng-zorro-antd/color-picker';
import {FormValidation} from '../../../../../shared/Utils/validators/form-validation';

@Component({
  selector: 'admin-product-item-color-create-dialog',
  imports: [
    NzButtonComponent,
    NzColDirective,
    NzFormControlComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzInputDirective,
    ReactiveFormsModule,
    NzModalFooterDirective,
    NzRowDirective,
    NzSwitchComponent,
    NzColorPickerComponent,
  ],
  templateUrl: './product-color-create-dialog.component.html',
  styleUrl: './product-color-create-dialog.component.scss'
})
export class ProductColorCreateDialogComponent implements OnDestroy, OnInit {
  isConfirmLoading = false;
  private _destroy = new Subject<void>();
  readonly nzModalData = inject(NZ_MODAL_DATA);
  id!: number;

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productColorService: ProductColorService,
    private modal: NzModalRef,
  ) {
    this.id = this.nzModalData.id;
  }

  ngOnInit(): void {

    this.initForm();
    if (this.id) {
      this.getColor();
    }
  }

  initForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      data: ['#1677ff', [Validators.required]],
      isActive: [true],
    });
  }

  handleCancel() {
    this.modal.destroy();
  }

  handleOk() {
    if (this.form.invalid) {
      FormValidation.checkValidation(this.form);
      return;
    }
    this.isConfirmLoading = true;
    if (this.id) {
      this.productColorService
        .editColor(this.id, this.form.value)
        .pipe(
          takeUntil(this._destroy),
          finalize(() => (this.isConfirmLoading = false)),
        )
        .subscribe({
          next: () => {
            this.modal.close(true);
          },
        });
    } else {
      this.productColorService
        .addColor(this.form.value)
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
  }

  getColor() {
    this.productColorService.getColor(this.id).subscribe((res) => {
      this.form.patchValue(res);
    });
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }
}
