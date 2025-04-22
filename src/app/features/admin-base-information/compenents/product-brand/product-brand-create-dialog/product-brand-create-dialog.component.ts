import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators,} from '@angular/forms';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent,} from 'ng-zorro-antd/form';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzSwitchComponent} from 'ng-zorro-antd/switch';
import {NZ_MODAL_DATA, NzModalFooterDirective, NzModalRef,} from 'ng-zorro-antd/modal';
import {finalize, Subject, takeUntil} from 'rxjs';
import {ProductBrandService} from '../../../services/product-brand.service';
import {FaCharOnlyDirective} from '../../../../../shared/directives/fa-char-only.directive';
import {EnCharOnlyDirective} from '../../../../../shared/directives/en-char-only.directive';
import {FormValidation} from '../../../../../shared/Utils/validators/form-validation';

@Component({
  selector: 'admin-product-item-brand-create-dialog',
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
    NzSwitchComponent,
    ReactiveFormsModule,
    NzModalFooterDirective,
    FaCharOnlyDirective,
    EnCharOnlyDirective,
  ],
  templateUrl: './product-brand-create-dialog.component.html',
  styleUrl: './product-brand-create-dialog.component.scss'
})
export class ProductBrandCreateDialogComponent implements OnDestroy, OnInit {
  isConfirmLoading = false;
  private _destroy = new Subject<void>();
  readonly nzModalData = inject(NZ_MODAL_DATA);
  id!: number;

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productBrandService: ProductBrandService,
    private modal: NzModalRef,
  ) {
    this.id = this.nzModalData.id;
  }

  ngOnInit(): void {
    this.initForm();
    if (this.id) {
      this.getBrand();
    }
  }

  initForm() {
    this.form = this.fb.group({
      persianTitle: ['', [Validators.required]],
      englishTitle: ['', [Validators.required]],
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
      this.productBrandService
        .editBrand(this.id, this.form.value)
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
      this.productBrandService
        .addBrand(this.form.value)
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

  getBrand() {
    this.productBrandService.getBrand(this.id).subscribe((res) => {
      this.form.patchValue(res);
    });
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }
}
