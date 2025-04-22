import {Component, EventEmitter, OnDestroy, OnInit, Output,} from '@angular/core';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent,} from 'ng-zorro-antd/form';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {NzTreeSelectComponent} from 'ng-zorro-antd/tree-select';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {combineLatest, Subject, takeUntil} from 'rxjs';
import {IVendorModel} from '../../../../shared/interfaces/vendor.model';
import {NzTreeNodeOptions} from 'ng-zorro-antd/core/tree';
import {IProductCategoryResponseModel} from '../../../../shared/interfaces/product-category.model';
import {VendorService} from '../../../../shared/services/vendor.service';
import {ProductService} from '../../services/product.service';
import {EnumConvertorUtils} from '../../../../shared/Utils/EnumConvertoModel';
import {PublishableStatusesLabel} from '../../enums/publishable-statuses.enum';

@Component({
  selector: 'app-product-search',
  imports: [
    NzButtonComponent,
    NzColDirective,
    NzFormControlComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzInputDirective,
    NzOptionComponent,
    NzRowDirective,
    NzSelectComponent,
    NzTreeSelectComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './product-search.component.html',
  styleUrl: './product-search.component.scss',
})
export class ProductSearchComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  vendorLis: IVendorModel[] = [];
  treeData: NzTreeNodeOptions[] = [];
  productExistList = [
    { value: '', name: 'همه' },
    { value: false, name: 'ناموجود' },
    { value: true, name: 'موجود' },
  ];

  specialProductList = [
    { value: '', name: 'همه' },
    { value: false, name: 'خیر' },
    { value: true, name: 'بله' },
  ];

  publishableStatusesList: any[] = [
    { label: 'همه', value: '' },
    ...EnumConvertorUtils.enumToListModel(PublishableStatusesLabel).map(
      (m) => ({
        label: m.name,
        value: m.value,
      }),
    ),
  ];

  private _destroy = new Subject<void>();
  @Output() filterChanged = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private vendorService: VendorService,
    private productService: ProductService,
  ) {}

  ngOnInit() {
    this.initForm();
    this.getData();

    this.form.controls['isProductExist'].valueChanges.subscribe(() => {
      this.filter();
    });

    this.form.controls['PublishableStatuses'].valueChanges.subscribe(() => {
      this.filter();
    });

    this.form.controls['productCategoryIds'].valueChanges.subscribe(() => {
      this.filter();
    });

    this.form.controls['vendorIds'].valueChanges.subscribe(() => {
      this.filter();
    });
  }

  initForm() {
    this.form = this.fb.group({
      title: [null],
      isProductExist: [''],
      PublishableStatuses: [''],
      ProductCode: [null],
      isSpecialProduct: [''],
      productTypeId: [0],
      vendorIds: [[]],
      productCategoryIds: [[]],
    });
  }

  private getData() {
    combineLatest([
      this.productService.categories(),
      this.vendorService.vendors(),
    ])
      .pipe(takeUntil(this._destroy))
      .subscribe(([categories, vendors]) => {
        this.treeData = this.buildTree(categories.items);

        this.vendorLis = vendors.filter(
          (vendor, index, self) =>
            index === self.findIndex((v) => v.id === vendor.id),
        );
      });
  }

  private buildTree(
    items: IProductCategoryResponseModel[],
  ): NzTreeNodeOptions[] {
    const itemMap: { [key: string]: NzTreeNodeOptions } = {};
    let root: NzTreeNodeOptions[] = [];

    items.forEach((item) => {
      itemMap[item.id] = {
        value: item.id.toString(),
        key: item.id.toString(),
        title: item.name,
        isLeaf: true,
        children: [],
        disabled: !item.isActive,
      };
    });

    const addChild = (
      parent: NzTreeNodeOptions,
      child: NzTreeNodeOptions,
      depth: number,
    ) => {
      if (parent && depth <= 3) {
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
        const parentDepth = this.getParentDepth(item.parentId, itemMap);
        if (parentDepth <= 2) {
          addChild(itemMap[item.parentId], itemMap[item.id], parentDepth + 1);
        }
      }
    });
    return root;
  }

  private getParentDepth(
    parentId: number,
    itemMap: { [key: string]: NzTreeNodeOptions },
  ): number {
    let depth = 0;
    let currentId = parentId;
    while (
      itemMap[currentId]['parentId'] !== null &&
      itemMap[currentId]['parentId'] !== undefined
    ) {
      depth++;
      currentId = itemMap[currentId]['parentId'];
    }
    return depth;
  }

  resetForm(): void {
    this.form.reset();
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.form.updateValueAndValidity();
    this.filter();
  }

  filter(event?: Event) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    let filter: any[] = [];
    Object.keys(this.form.controls).forEach((key) => {
      if (
        this.form.controls[key].value !== undefined &&
        this.form.controls[key].value !== null
      )
        filter.push({
          key: key,
          value: this.form.controls[key].value,
        });
    });
    this.filterChanged.emit(filter);
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
