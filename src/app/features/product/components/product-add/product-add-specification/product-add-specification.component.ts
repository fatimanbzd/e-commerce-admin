import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { map, Subject, takeUntil } from 'rxjs';
import {
  FormArray,
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
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import { NzInputDirective, NzInputGroupComponent } from 'ng-zorro-antd/input';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { ToastrService } from 'ngx-toastr';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { ProductSpecificationService } from '../../../services/product-specification.service';
import { IProductSpecificationsResponseModel } from '../../../interfaces/product-specification.model';
import {
  NzTableComponent,
  NzTdAddOnComponent,
  NzThMeasureDirective,
  NzTrExpandDirective,
} from 'ng-zorro-antd/table';
import { NgForOf, NgStyle } from '@angular/common';
import { NzModalService } from 'ng-zorro-antd/modal';
import { RoleUtil } from '../../../../../shared/Utils/role-base';
import { NzCheckboxComponent } from 'ng-zorro-antd/checkbox';

@Component({
  selector: 'admin-product-add-specification',
  imports: [
    ReactiveFormsModule,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzColDirective,
    NzFormControlComponent,
    NzInputDirective,
    NzFormDirective,
    NzIconDirective,
    NzButtonComponent,
    NzRowDirective,
    NzInputGroupComponent,
    NzDividerComponent,
    NzTableComponent,
    NzThMeasureDirective,
    NgStyle,
    NgForOf,
    NzTdAddOnComponent,
    NzTrExpandDirective,
    NzCheckboxComponent,
  ],
  templateUrl: './product-add-specification.component.html',
  styleUrl: './product-add-specification.component.scss',
})
export class ProductAddSpecificationComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  isAdmin = false;
  productSpecs: IProductSpecificationsResponseModel[] = [];
  checkedCount: number = 0;
  private editMode = false;
  private productSpecificationsId!: number;
  private readonly _destroy = new Subject<void>();
  @Input() productId!: number;

  constructor(
    private fb: NonNullableFormBuilder,
    private toastr: ToastrService,
    private productSpecService: ProductSpecificationService,
    private modal: NzModalService,
  ) {
    this.isAdmin = RoleUtil.isAdmin();
  }

  ngOnInit(): void {
    this.initForm();
    this.generatePropertiesControls(1);
    this.getData(this.productId);
  }

  get specification(): FormArray {
    return this.form.get('productSpecifications') as FormArray;
  }

  initForm() {
    this.form = this.fb.group({
      groupName: ['', Validators.required],
      productSpecifications: this.fb.array([]),
    });
  }

  createSpecificationFormGroup() {
    return this.fb.group({
      key: ['', Validators.required],
      value: ['', Validators.required],
      isSpecial: [false, Validators.required],
    });
  }

  generatePropertiesControls(count: number) {
    this.specification.clear();
    for (let i = 0; i < count; i++) {
      this.specification.push(this.createSpecificationFormGroup());
    }
  }

  addSpecification(e?: MouseEvent): void {
    e?.preventDefault();
    if (this.specification.at(this.specification.length - 1).invalid) {
      this.toastr.error('مشخصات را وارد کنید!');
      return;
    }

    this.specification.push(this.createSpecificationFormGroup());
  }

  removeSpecification(i: number, e: MouseEvent): void {
    e.preventDefault();
    if (this.specification.length == 1) this.specification.at(i).reset();
    else this.specification.removeAt(i);
  }

  getData(productId: number | null) {
    if (productId)
      this.productSpecService
        .productSpecs(productId)
        .pipe(
          map((m) => {
            return m.map((s) => ({ ...s, expand: false }));
          }),
          takeUntil(this._destroy),
        )
        .subscribe((groups) => {
          this.productSpecs = groups;
          const specs =
            groups?.flatMap((group) => group.productSpecifications) ?? [];
          this.checkedCount = specs.filter((spec) => spec.isSpecial).length;
        });
  }

  removeSpec(data: IProductSpecificationsResponseModel) {
    this.modal.confirm({
      nzTitle: `آیا از از حذف گروه "${data.groupName} " مطمئن هستید؟`,
      nzOkText: 'بله',
      nzCancelText: 'خیر',
      nzOnOk: () => {
        this.productSpecService
          .removeSpec(this.productId, data.productSpecificationsId)
          .pipe(takeUntil(this._destroy))
          .subscribe({
            next: () => {
              this.toastr.success('مشخصه با موفقیت حذف شد.');
              this.getData(this.productId);
            },
          });
      },
    });
  }

  editSpec(spec: IProductSpecificationsResponseModel) {
    this.editMode = true;
    this.productSpecificationsId = spec.productSpecificationsId;
    if (this.specification.controls.length > 0) {
      for (let i = this.specification.controls.length - 1; i >= 0; i--) {
        this.specification.removeAt(i);
      }
    }

    if (spec.productSpecifications.length > 0)
      for (let i = 0; i < spec.productSpecifications.length; i++) {
        this.specification.push(this.createSpecificationFormGroup());
      }
    this.form.patchValue(spec);
  }

  update() {
    this.productSpecService
      .updateProductSpec(
        this.productId,
        this.productSpecificationsId,
        this.form.value,
      )
      .pipe(takeUntil(this._destroy))
      .subscribe(() => {
        this.getData(this.productId);
        this.toastr.success('اطلاعات با موفقیت ثبت شد.');
        this.clearForm();
      });
  }

  add() {
    this.productSpecService
      .addProductSpec(this.productId, this.form.value)
      .pipe(takeUntil(this._destroy))
      .subscribe(() => {
        this.getData(this.productId);
        this.toastr.success('اطلاعات با موفقیت ثبت شد.');
        this.clearForm();
      });
  }

  submitForm(): void {
    if (this.specification.length == 1 && this.specification.at(0).invalid) {
      this.toastr.error('حداقل یک مشخصه را وارد کنید!');
      return;
    }

    const newCheckedCount = this.specification.controls.filter(
      (f) => f.value.isSpecial,
    ).length;
    const finalCheckedCount = this.checkedCount + newCheckedCount;

    if (finalCheckedCount > 6) {
      this.toastr.error('تعداد مشخصات اصلی نمی تواند بیشتر از 6 باشد !');
      return;
    }

    if (this.form.invalid) {
      this.specification.removeAt(this.specification.length - 1);
    }

    if (this.productId) {
      if (this.editMode) this.update();
      else this.add();
    }
  }

  publish(data: IProductSpecificationsResponseModel) {
    if (this.productId)
      this.modal.confirm({
        nzTitle: `آیا از از انتشار گروه "${data.groupName} " مطمئن هستید؟`,
        nzOkText: 'بله',
        nzCancelText: 'خیر',
        nzOnOk: () => {
          if (this.productId)
            this.productSpecService
              .publish(this.productId, data.productSpecificationsId)
              .pipe(takeUntil(this._destroy))
              .subscribe({
                next: () => {
                  this.getData(this.productId);
                  this.toastr.success('گروه با موفقیت منتشر شد');
                },
              });
        },
      });
  }

  clearForm() {
    this.editMode = false;
    if (this.specification.controls.length > 0) {
      for (let i = this.specification.controls.length - 2; i >= 0; i--) {
        this.specification.removeAt(i);
      }
    }
    this.form.reset();
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
