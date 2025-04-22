import {Component, Input, OnInit} from '@angular/core';
import {NzAutosizeDirective, NzInputDirective} from 'ng-zorro-antd/input';
import {NzCheckboxComponent} from 'ng-zorro-antd/checkbox';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent,} from 'ng-zorro-antd/form';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EnumConvertorUtils} from '../../../../../shared/Utils/EnumConvertoModel';
import {WeightCategoryLabel} from '../../../enums/weight-category.enum';
import {Subject, takeUntil} from 'rxjs';
import {ProductService} from '../../../services/product.service';
import {IProductBaseInfoAddResponseModel} from '../../../interfaces/product-add.model';

@Component({
    selector: 'admin-product-info-base',
  imports: [
    NzAutosizeDirective,
    NzCheckboxComponent,
    NzColDirective,
    NzFormControlComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzInputDirective,
    NzRowDirective,
    ReactiveFormsModule,
    FormsModule,
  ],
    templateUrl: './product-info-base.component.html',
    styleUrl: './product-info-base.component.scss'
})
export class ProductInfoBaseComponent implements OnInit {
  product!: IProductBaseInfoAddResponseModel;
  relatedproducts: string = '';
  weightCategoryList = EnumConvertorUtils.enumToListModel(WeightCategoryLabel);
  weightCategoryName!: string | undefined;
  loading: boolean = false;
  private readonly _destroy = new Subject<void>();
  @Input() productId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
  ) {}

  ngOnInit() {
    this.getProduct();
  }

  getProduct() {
    if (this.productId)
      this.productService
        .product(this.productId)
        .pipe(takeUntil(this._destroy))
        .subscribe((product) => {
          this.product = product;
          this.relatedproducts = product.productCategoryRelations
            .flatMap((m) => m.name)
            .join(',');
          this.weightCategoryName = this.weightCategoryList.find(
            (k: any) => k.value === product.weightCategory,
          )?.name;
        });
  }
}
