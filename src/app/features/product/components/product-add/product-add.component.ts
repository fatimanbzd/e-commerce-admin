import {Component, OnDestroy, OnInit} from '@angular/core';
import {NzTabComponent, NzTabDirective, NzTabPosition, NzTabSetComponent,} from 'ng-zorro-antd/tabs';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators,} from '@angular/forms';
import {ProductAddBaseInfoComponent} from './product-add-base-info/product-add-base-info.component';
import {ProductAddSeoComponent} from './product-add-seo/product-add-seo.component';
import {ProductAddPriceComponent} from './product-add-price/product-add-price.component';
import {ProductAddAttachmentComponent} from './product-add-attachment/product-add-attachment.component';
import {ProductAddSpecificationComponent} from './product-add-specification/product-add-specification.component';
import {ProductAddSizeComponent} from './product-add-size/product-add-size.component';
import {Subject, takeUntil} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {ProductFormStateEnum} from '../../enums/product-form-state.enum';
import {toBoolean} from 'ng-zorro-antd/core/util';
import {NzButtonComponent, NzButtonGroupComponent,} from 'ng-zorro-antd/button';
import {AuthService} from '../../../../shared/services/auth.service';
import {RoleUtil} from '../../../../shared/Utils/role-base';
import {ProductService} from '../../services/product.service';
import {IProductBaseInfoAddResponseModel} from '../../interfaces/product-add.model';
import {NzModalComponent, NzModalContentDirective, NzModalModule,} from 'ng-zorro-antd/modal';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent,} from 'ng-zorro-antd/form';
import {ToastrService} from 'ngx-toastr';
import {NzAutosizeDirective, NzInputDirective} from 'ng-zorro-antd/input';
import {NzSwitchComponent} from 'ng-zorro-antd/switch';
import {NzPopconfirmDirective} from 'ng-zorro-antd/popconfirm';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {FormValidation} from '../../../../shared/Utils/validators/form-validation';


@Component({
  selector: 'admin-product-add',
  imports: [
    NzTabSetComponent,
    NzTabComponent,
    FormsModule,
    NzTabDirective,
    ProductAddBaseInfoComponent,
    ProductAddSeoComponent,
    ProductAddPriceComponent,
    ProductAddAttachmentComponent,
    ProductAddSpecificationComponent,
    ProductAddSizeComponent,
    NzButtonComponent,
    NzModalComponent,
    NzModalContentDirective,
    NzModalModule,
    ReactiveFormsModule,
    NzColDirective,
    NzFormControlComponent,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzRowDirective,
    NzInputDirective,
    NzAutosizeDirective,
    NzFormDirective,
    NzSwitchComponent,
    NzButtonGroupComponent,
    NzPopconfirmDirective,
    NzIconDirective,
  ],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.scss',
})
export class ProductAddComponent implements OnInit, OnDestroy {
  isVisibleModal = false;
  data!: IProductBaseInfoAddResponseModel;
  isAdmin = false;
  isActive: boolean | null = false;
  nzTabPosition: NzTabPosition = 'right';
  selectedIndex = 0;
  productId!: number;
  isPriceEditMode = false;
  editMode = false;
  currentState: ProductFormStateEnum = ProductFormStateEnum.add;
  protected readonly ProductFormStateEnum = ProductFormStateEnum;
  private readonly _destroy = new Subject<void>();

  form!: FormGroup;

  constructor(
    private activateRoute: ActivatedRoute,
    private authService: AuthService,
    private productService: ProductService,
    private toastr: ToastrService,
    private fb: FormBuilder,
  ) {
    this.productId = activateRoute.snapshot.params['id'];
    this.isPriceEditMode = toBoolean(
      activateRoute.snapshot.params['editPrice'],
    );
    this.isAdmin = RoleUtil.isAdmin();
  }

  ngOnInit() {
    this.initForm();
    this.setState();
    this.getProduct();
  }

  initForm() {
    this.form = this.fb.group({
      reason: [null, [Validators.required]],
    });
  }

  publishProduct(): void {
    this.productService
      .setPublishable(this.productId)
      .pipe(takeUntil(this._destroy))
      .subscribe(() => {
        this.toastr.success('محصول به وضعیت منتشرشده تغییر یافت');
        this.data.havePending = false;
      });
  }

  unpublishProduct(): void {
    this.isVisibleModal = true;
  }

  changeActiveStatus(isActive: boolean): void {
    if (!isActive) {
      this.productService
        .InActive(this.productId)
        .pipe(takeUntil(this._destroy))
        .subscribe(() => {
          this.toastr.success('محصول به وضعیت غیرفعال تغییر یافت');
        });
    } else {
      this.productService
        .Active(this.productId)
        .pipe(takeUntil(this._destroy))
        .subscribe(() => {
          this.toastr.success('محصول به وضعیت فعال تغییر یافت');
        });
    }
  }

  handleOk(form: FormGroup): void {
    if (this.form.invalid) {
      FormValidation.checkValidation(this.form);
      return;
    } else {
      this.productService
        .setUnPublishable(this.productId, form.value)
        .pipe(takeUntil(this._destroy))
        .subscribe(() => {
          this.toastr.success('عدم انتشار محصول');
          this.isVisibleModal = false;
          this.data.havePending = false;
        });
    }
  }

  resetForm() {
    this.form.reset();
  }

  handleCancel(): void {
    this.isVisibleModal = false;
  }

  setState(): void {
    if (this.productId && this.isPriceEditMode) {
      this.currentState = ProductFormStateEnum.editPrice;
    } else if (this.productId && !this.isPriceEditMode) {
      this.editMode = true;
      this.currentState = ProductFormStateEnum.edit;
    } else this.currentState = ProductFormStateEnum.add;
  }

  isTabDisabled(tabName: string): boolean {
    switch (this.currentState) {
      case ProductFormStateEnum.add:
        return tabName !== 'baseInfo';
      case ProductFormStateEnum.edit:
        return false;
      case ProductFormStateEnum.editPrice: {
        this.selectedIndex = 1;
        return tabName !== 'price';
      }
      default:
        return true;
    }
  }

  getProduct() {
    if (this.productId)
      this.productService
        .product(this.productId)
        .pipe(takeUntil(this._destroy))
        .subscribe((product) => {
          this.data = product;
        });
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
