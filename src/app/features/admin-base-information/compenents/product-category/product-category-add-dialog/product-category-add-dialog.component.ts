import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import {
  NzFormControlComponent,
  NzFormDirective,
  NzFormItemComponent,
  NzFormLabelComponent,
} from 'ng-zorro-antd/form';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import {
  NZ_MODAL_DATA,
  NzModalFooterDirective,
  NzModalRef,
} from 'ng-zorro-antd/modal';
import { ProductCategoryService } from '../../../services/product-category.service';
import { finalize, Subject, takeUntil } from 'rxjs';
import { IProductCategoryAddModel } from '../../../interfaces/product-category-add.model';
import { IProductCategoryEditModel } from '../../../interfaces/product-category-edit.model';
import { NzSwitchComponent } from 'ng-zorro-antd/switch';
import { Utilities } from '@core/Utils/utilities';

@Component({
  selector: 'admin-product-item-category-add-dialog',
  imports: [
    ReactiveFormsModule,
    NzColDirective,
    NzFormControlComponent,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzRowDirective,
    NzInputDirective,
    NzButtonComponent,
    NzModalFooterDirective,
    NzSwitchComponent,
    NzFormDirective,
  ],
  templateUrl: './product-category-add-dialog.component.html',
  styleUrl: './product-category-add-dialog.component.scss',
})
export class ProductCategoryAddDialogComponent implements OnInit, OnDestroy {
  readonly nzModalData = inject(NZ_MODAL_DATA);
  protected submitted = false;
  form: FormGroup = this.fb.group({
    name: [null, Validators.required],
    isActive: [false, Validators.required],
    description: [null],
  });

  private _destroy = new Subject<void>();

  constructor(
    private modal: NzModalRef,
    private productCategoryService: ProductCategoryService,
    private fb: NonNullableFormBuilder,
  ) {}

  ngOnInit() {
    if (this.nzModalData.editMode) this.getData();
  }

  getData() {
    this.productCategoryService
      .category(this.nzModalData.node.key)
      .pipe(takeUntil(this._destroy))
      .subscribe((cat) => this.form.patchValue({ ...cat }));
  }

  submit() {
    if (this.form.invalid) {
      Utilities.checkValidation(this.form);
      return;
    }

    if (this.nzModalData.editMode) this.update();
    else this.add();
  }

  add() {
    const model: IProductCategoryAddModel = {
      name: this.form.value.name,
      parentId: this.nzModalData.node.key,
      isActive: this.form.value.isActive,
      description: this.form.value.description,
    };

    this.productCategoryService
      .addCategory(model)
      .pipe(
        finalize(() => (this.submitted = false)),
        takeUntil(this._destroy),
      )
      .subscribe((cat) => {
        const { id, name } = { id: cat.id, name: this.form.value.name };
        if (cat.id) this.modal.close({ id, name });
      });
  }

  update() {
    const model: IProductCategoryEditModel = {
      id: this.nzModalData.node.key,
      name: this.form.value.name,
      parentId: this.nzModalData.node.parentId,
      isActive: this.form.value.isActive,
      description: this.form.value.description,
    };

    this.productCategoryService
      .updateCategory(model, model.id)
      .pipe(
        finalize(() => (this.submitted = false)),
        takeUntil(this._destroy),
      )
      .subscribe(() => this.modal.close(model));
  }

  handleCancel(): void {
    this.modal.destroy(false);
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
