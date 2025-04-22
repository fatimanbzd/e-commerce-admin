import {Component, DestroyRef, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators,} from '@angular/forms';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent,} from 'ng-zorro-antd/form';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzInputDirective, NzInputGroupComponent} from 'ng-zorro-antd/input';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {NzDividerComponent} from 'ng-zorro-antd/divider';
import {NzAlertComponent} from 'ng-zorro-antd/alert';
import {WarrantyCategoryLabel} from '../../../enums/warranty-category.enum';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {distinctUntilChanged} from 'rxjs';
import {IColorsModel, IProductPricesModel,} from '../../../interfaces/product-price.model';
import {ToastrService} from 'ngx-toastr';
import {ProductPriceService} from '../../../services/product-price.service';
import {NzTableComponent,} from 'ng-zorro-antd/table';
import {empty} from '../../../pipes/empty.pipe';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle,} from '@angular/material/datepicker';
import {MatFormField, MatSuffix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzPopconfirmDirective} from 'ng-zorro-antd/popconfirm';
import {RoleUtil} from '../../../../../shared/Utils/role-base';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {OnlyNumberDirective} from '../../../../../shared/directives/only-number.directive';
import {PersianDatePipe} from '../../../../../shared/pipes/persian-date.pipe';
import {PricePipe} from '../../../../../shared/pipes/price.pipe';
import {FormValidation} from '../../../../../shared/Utils/validators/form-validation';
import {EnumConvertorUtils} from '../../../../../shared/Utils/EnumConvertoModel';

@Component({
  selector: 'admin-product-add-price',
  imports: [
    FormsModule,
    NzFormDirective,
    ReactiveFormsModule,
    NzRowDirective,
    NzColDirective,
    NzFormControlComponent,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzInputDirective,
    NzSelectComponent,
    NzOptionComponent,
    NzDividerComponent,
    NzAlertComponent,
    OnlyNumberDirective,
    NzInputGroupComponent,
    NzButtonComponent,
    NzTableComponent,
    empty,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatFormField,
    MatInput,
    MatSuffix,
    NzIconDirective,
    NzPopconfirmDirective,
    PersianDatePipe,
    PricePipe,
  ],
  templateUrl: './product-add-price.component.html',
  styleUrl: './product-add-price.component.scss'
})
export class ProductAddPriceComponent implements OnInit {
  isAdmin = false;
  productPrices: IProductPricesModel[] = [];
  colors: IColorsModel[] = [];
  form!: FormGroup;

  warrantyCategoryList = EnumConvertorUtils.enumToListModel(
    WarrantyCategoryLabel,
  );

  calculatedText: number | null = null;
  listOfCurrency = ['ریال', 'دلار'];
  listOfRound = ['خیر', '100 ريال', '1000 ريال', '10000 ريال', '100000 ريال'];
  listOfHowToRound = ['نزدیک', 'رو به بالا', 'رو به پایین'];
  editMode = false;
  @Input() productId: number | null = null;

  constructor(
    public fb: FormBuilder,
    private productPriceService: ProductPriceService,
    private toastr: ToastrService,
    private destroyRef: DestroyRef,
  ) {
    this.isAdmin = RoleUtil.isAdmin();
  }

  ngOnInit() {
    this.initForm();
    this.form.controls['price'].valueChanges
      .pipe(distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        const numberValue = res;
        if (numberValue && numberValue >= 10) {
          this.calculatedText = Math.floor(numberValue / 10);
        } else {
          this.calculatedText = null;
        }
      });

    this.form.valueChanges.subscribe((values) => {
      this.updateFormWithFinalPrice(values);
    });
    this.getColors();
    if (this.productId) this.getData(this.productId);
  }

  initForm(): void {
    this.form = this.fb.group({
      selectCurrency: [null],
      rounding: [null],
      howToRound: [null],
      shippingAndInstallationCost: [null],
      colorId: [null, [Validators.required]],
      productGuaranty: [null, [Validators.required]],
      price: [null, [Validators.required]],
      valueAddedTaxPercent: [
        0,
        [
          Validators.pattern('^\\d{1,2}(\\.\\d{0,2})?$'),
          Validators.min(0),
          Validators.max(100),
        ],
      ],

      discountPercent: [
        0,
        [
          Validators.pattern('^\\d{1,2}(\\.\\d{0,2})?$'),
          Validators.min(0),
          Validators.max(100),
        ],
      ],

      discountExpireDate: [null],
      highestNumberOfOrders: [
        null,
        [Validators.required, Validators.max(100000)],
      ],
      lowestNumberOfOrders: [null, [Validators.required, Validators.min(1)]],
      inventory: [null, [Validators.required, Validators.max(100000)]],
      productPriceId: [null],
      finalPrice: [null],
    });
  }

  deletePrice(data: IProductPricesModel) {
    this.productPriceService
      .deletePrice(this.productId, data.productPriceId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.toastr.success(`حذف با موفقیت انجام شد`);
        this.getData(this.productId);
      });
  }

  getColors() {
    this.productPriceService
      .getColor()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((colors) => (this.colors = colors));
  }

  getData(productId: number | null) {
    this.productPriceService
      .productPrices(productId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((prices) => (this.productPrices = prices));
  }

  getDataByID(id: number) {
    return this.productPriceService
      .productPrice(this.productId, id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((price) => {
        this.form.patchValue(price);
        this.editMode = true;
      });
  }

  onSubmit(form: FormGroup): void {
    if (this.form.invalid) {
      FormValidation.checkValidation(this.form);
      return;
    }
    if (this.editMode) this.update(this.form);
    else this.add(form);
  }

  update(form: FormGroup) {
    this.productPriceService
      .updateProductPrice(
        this.productId,
        this.form.controls['productPriceId'].value,
        form.value,
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.toastr.success('اطلاعات با موفقیت ویرایش شد');
        this.getData(this.productId);
        this.resetForm();
      });
  }

  add(form: FormGroup) {
    this.productPriceService
      .addProductPrice(this.productId, form.value)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        if (res) {
          this.toastr.success('اطلاعات با موفقیت ثبت شد');
          this.getData(this.productId);
          this.resetForm();
        }
      });
  }

  resetForm() {
    this.editMode = false;
    this.form.reset();
    this.form.patchValue({
      discount: 0,
      valueAddedTax: 0,
    });
  }

  calculateFinalPrice(value: IProductPricesModel): number {
    const price = value.price || 0;
    const taxRate = value.valueAddedTaxPercent || 0;
    const discountRate = value.discountPercent || 0;

    const discountAmount = (price * discountRate) / 100;
    const totalWithDiscount = price - discountAmount;
    const taxAmount = (totalWithDiscount * taxRate) / 100;
    return totalWithDiscount + taxAmount;
  }

  updateFormWithFinalPrice(value: IProductPricesModel): void {
    const finalPrice = this.calculateFinalPrice(value);
    this.form.patchValue({finalPrice});
  }

  onDiscountExpireDateChange(event: any) {
    let selectedDate = new Date(event.value);
    selectedDate.setHours(12, 0, 0, 0);
    this.form.get('discountExpireDate')?.setValue(selectedDate);
  }

  onInputTaxPercent(event: any) {
    const value = event.target.value;
    const regex = /^\d{0,2}(\.\d{0,2})?$/;
    if (!regex.test(value)) {
      event.target.value = value.slice(0, -1);
    }
  }
}

