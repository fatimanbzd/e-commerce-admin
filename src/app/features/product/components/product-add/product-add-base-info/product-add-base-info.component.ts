import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  SecurityContext,
} from '@angular/core';
import {
  NzFormControlComponent,
  NzFormDirective,
  NzFormItemComponent,
  NzFormLabelComponent,
} from 'ng-zorro-antd/form';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import { NzAutosizeDirective, NzInputDirective } from 'ng-zorro-antd/input';
import { combineLatest, finalize, Subject, takeUntil } from 'rxjs';
import { NzTreeSelectComponent } from 'ng-zorro-antd/tree-select';
import { ProductService } from '../../../services/product.service';
import { NzTreeNodeOptions } from 'ng-zorro-antd/core/tree/nz-tree-base-node';
import { NzOptionComponent, NzSelectComponent } from 'ng-zorro-antd/select';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import { TEXT_FORMATTING_TYPE } from '../../../../../shared/utilities/text-editor/constants';
import { NzCheckboxComponent } from 'ng-zorro-antd/checkbox';
import { EnumConvertorUtils } from '@core/Utils/EnumConvertoModel';
import { WeightCategoryLabel } from '../../../enums/weight-category.enum';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';
import { OnlyNumberDirective } from '@core/directives/only-number.directive';
import { EnCharOnlyDirective } from '@core/directives/en-char-only.directive';
import { requiredIfValidator } from '@core/validators/validateIf';
import { IProductAddModel } from '../../../interfaces/product-add.model';
import { IProductBrandResponseModel } from '../../../interfaces/product-brand-response.model';
import { IProductUnitResponseModel } from '../../../interfaces/product-unit-response.model';
import { Router } from '@angular/router';
import { Utilities } from '@core/Utils/utilities';
import { RoleUtil } from '../../../../../shared/utilities/role-base';
import { NzRadioComponent, NzRadioGroupComponent } from 'ng-zorro-antd/radio';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AuthService } from '../../../../../shared/services/auth.service';
import { IProductCategoryResponseModel } from '@core/interfaces/product-category.model';

@Component({
  selector: 'admin-product-add-base-info',
  imports: [
    NzFormDirective,
    ReactiveFormsModule,
    NzColDirective,
    NzFormControlComponent,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzInputDirective,
    NzRowDirective,
    NzTreeSelectComponent,
    NzSelectComponent,
    NzOptionComponent,
    NzAutosizeDirective,
    NgxEditorModule,
    NzCheckboxComponent,
    NzButtonComponent,
    OnlyNumberDirective,
    EnCharOnlyDirective,
    NzRadioComponent,
    NzRadioGroupComponent,
    FormsModule,
  ],
  providers: [NzModalService],
  templateUrl: './product-add-base-info.component.html',
  styleUrl: './product-add-base-info.component.scss',
})
export class ProductAddBaseInfoComponent implements OnInit, OnDestroy {
  isAdmin = false;
  isPending = false;
  haveProductInformationPending = false;
  form: FormGroup = this.fb.group({
    persianTitle: [null, Validators.required],
    englishTitle: [null, Validators.required],
    productCategoryId: [null, Validators.required],
    productTypeId: [{ value: 0, disabled: true }, Validators.required],
    brandId: [null, Validators.required],
    weight: [null],
    weightCategory: [null, Validators.required],
    unitId: [null],
    tags: [null],
    description: [''],
    shortDescription: [''],
    isExternalProduct: [false],
    externalProductLink: [
      null,
      [requiredIfValidator(() => this.form.get('isExternalProduct')?.value)],
    ],
    isActive: [true],
    productCategoryRelations: [null, Validators.required],
  });
  treeData: NzTreeNodeOptions[] = [];
  brands: IProductBrandResponseModel[] = [];
  weightCategoryList = EnumConvertorUtils.enumToListModel(WeightCategoryLabel);
  unitList: IProductUnitResponseModel[] = [];
  loading: boolean = false;
  editor_shortDescription!: Editor;
  editor_description!: Editor;
  toolbar: Toolbar = [
    [
      TEXT_FORMATTING_TYPE['BOLD'],
      TEXT_FORMATTING_TYPE['ITALIC'],
      TEXT_FORMATTING_TYPE['BULLET_LIST'],
      TEXT_FORMATTING_TYPE['ORDERED_LIST'],
    ],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  private readonly _destroy = new Subject<void>();
  @Input() productId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private toaster: ToastrService,
    private authService: AuthService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private modal: NzModalService,
  ) {
    this.isAdmin = RoleUtil.isAdmin();
  }

  ngOnInit() {
    this.getData();
    this.getProduct();
    this.editor_shortDescription = new Editor();
    this.editor_description = new Editor();

    this.form.controls['isExternalProduct'].valueChanges.subscribe(() => {
      this.form.get('externalProductLink')?.updateValueAndValidity();
    });
  }

  onChangeEditMode(value: boolean) {
    if (value) this.getProductPending();
    else this.getProduct();
  }

  getProduct() {
    if (this.productId)
      this.productService
        .product(this.productId)
        .pipe(takeUntil(this._destroy))
        .subscribe((product) => {
          this.form.patchValue(product);
          this.isPending = product.haveProductInformationPending;
          this.form
            .get('productCategoryId')
            ?.setValue(product.productCategoryId.toString());
          this.form
            .get('productCategoryRelations')
            ?.setValue(
              product.productCategoryRelations.map((re) => re.id.toString()),
            );
        });
  }

  getProductPending() {
    if (this.productId)
      this.productService
        .productPending(this.productId)
        .pipe(takeUntil(this._destroy))
        .subscribe((product) => {
          this.form.patchValue(product);
          this.form
            .get('productCategoryId')
            ?.setValue(product.productCategoryId.toString());
          this.form
            .get('productCategoryRelations')
            ?.setValue(
              product.productCategoryRelations.map((re) => re.id.toString()),
            );
        });
  }

  private getData() {
    combineLatest([
      this.productService.categories(),
      this.productService.brands(),
      this.productService.units(),
    ])
      .pipe(takeUntil(this._destroy))
      .subscribe(([categories, brands, units]) => {
        this.treeData = this.buildTree(categories.items);
        this.brands = brands;
        this.unitList = units;
      });
  }

  private buildTree(
    items: IProductCategoryResponseModel[],
  ): NzTreeNodeOptions[] {
    const itemMap: { [key: string]: NzTreeNodeOptions } = {};
    let root: NzTreeNodeOptions[] = [];

    items.forEach((item) => {
      itemMap[item.id] = {
        key: item.id.toString(),
        title: item.name,
        isLeaf: true,
        children: [],
        disabled: !item.isActive,
      };
    });
    const addChild = (parent: NzTreeNodeOptions, child: NzTreeNodeOptions) => {
      if (parent) {
        parent.children?.push(child);
        parent.isLeaf = false;
        parent.disabled = !parent.isLeaf;
      }
    };

    items.forEach((item) => {
      if (item.parentId === null) {
        if (item.id !== 1) {
          root.push(itemMap[item.id]);
        }
      } else if (item.parentId === 1) {
        root.push(itemMap[item.id]);
      } else {
        addChild(itemMap[item.parentId], itemMap[item.id]);
      }
    });

    return root;
  }

  submit(form: FormGroup) {
    if (form.invalid) {
      Utilities.checkValidation(form);
      return;
    }

    const productCategoryRelations = this.form.value.productCategoryRelations
      ? this.form.value.productCategoryRelations.map((x: string) => {
          return +x;
        })
      : [];

    const formValue = form.value;
    const model: IProductAddModel = {
      persianTitle: formValue.persianTitle,
      englishTitle: formValue.englishTitle,
      productCategoryId: +formValue.productCategoryId,
      productTypeId: formValue.productTypeId,
      brandId: formValue.brandId,
      weight: +formValue.weight,
      weightCategory: formValue.weightCategory,
      unitId: formValue.unitId,
      tags: formValue.tags,
      description: this.sanitizeHtmlContent(formValue?.description),
      shortDescription: this.sanitizeHtmlContent(formValue?.shortDescription),
      isExternalProduct: formValue.isExternalProduct,
      externalProductLink: formValue.externalProductLink,
      isActive: formValue.isActive,
      productCategoryRelations: productCategoryRelations,
    };
    this.loading = true;
    if (this.productId) {
      this.updateConfirmation(model, this.productId);
    } else {
      this.add(model);
    }
  }

  private add(model: IProductAddModel) {
    this.productService
      .addProduct(model)
      .pipe(
        takeUntil(this._destroy),
        finalize(() => (this.loading = false)),
      )
      .subscribe({
        next: (response) => {
          this.productService.setProductId(response.id);
          this.router.navigate(['pages/product/edit', response.id]);
          this.toaster.success('اطلاعات با موفقیت ثبت شد.');
        },
      });
  }

  private updateConfirmation(model: IProductAddModel, productId: number) {
    if (productId)
      if (!this.haveProductInformationPending)
        this.modal.confirm({
          nzTitle: `تغییرات در وضعیت منتشر شده انجام گرفته است آیا از تغییر این اطلاعات مطمئن هستید؟`,
          nzOkText: 'بله',
          nzCancelText: 'خیر',
          nzOnOk: () => {
            this.update(model, productId);
          },
          nzOnCancel: () => {
            this.loading = false;
          },
        });
      else this.update(model, productId);
  }

  update(model: IProductAddModel, productId: number) {
    this.productService
      .updateProduct(productId, model)
      .pipe(
        takeUntil(this._destroy),
        finalize(() => (this.loading = false)),
      )
      .subscribe({
        next: () => {
          this.toaster.success('اطلاعات با موفقیت ویرایش شد.');
        },
      });
  }

  private sanitizeHtmlContent(htmlString: any): string | null {
    return this.sanitizer.sanitize(SecurityContext.HTML, htmlString);
  }

  ngOnDestroy() {
    this.editor_description.destroy();
    this.editor_shortDescription.destroy();
    this._destroy.next();
    this._destroy.complete();
  }
}
