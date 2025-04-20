import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import {
  NzFormControlComponent,
  NzFormDirective,
  NzFormItemComponent,
  NzFormLabelComponent,
} from 'ng-zorro-antd/form';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { NzSwitchComponent } from 'ng-zorro-antd/switch';
import {
  NZ_MODAL_DATA,
  NzModalFooterDirective,
  NzModalRef,
} from 'ng-zorro-antd/modal';
import { finalize, Subject, takeUntil } from 'rxjs';
import { ProductBrandService } from '../../../services/product-brand.service';
import { FaCharOnlyDirective } from '@core/directives/fa-char-only.directive';
import { EnCharOnlyDirective } from '@core/directives/en-char-only.directive';
import { Utilities } from '@core/Utils/utilities';

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

  form: FormGroup<{
    persianTitle: FormControl<string | null>;
    englishTitle: FormControl<string | null>;
    isActive: FormControl<boolean | null>;
  }> = this.fb.group({
    persianTitle: ['', [Validators.required]],
    englishTitle: ['', [Validators.required]],
    isActive: [true],
  });

  constructor(
    private fb: FormBuilder,
    private productBrandService: ProductBrandService,
    private modal: NzModalRef,
  ) {
    this.id = this.nzModalData.id;
  }

  ngOnInit(): void {
    if (this.id) {
      this.getBrand();
    }
  }

  handleCancel() {
    this.modal.destroy();
  }

  handleOk() {
    if (this.form.invalid) {
      Utilities.checkValidation(this.form);
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
