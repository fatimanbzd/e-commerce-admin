import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {NzTableQueryParams} from 'ng-zorro-antd/table';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {ProductService} from '../../services/product.service';
import {finalize, Subject, takeUntil} from 'rxjs';
import {IProductsListModel} from '../../interfaces/products-list.model';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule,} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpParams} from '@angular/common/http';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {QlandTableComponent} from '../../../../shared/components/qland-table/qland-table.component';
import {TableColumn} from '../../../../shared/interfaces/qland-table.model';

import {RoleUtil} from '../../../../shared/Utils/role-base';
import {AuthService} from '../../../../shared/services/auth.service';
import {MehrFilterComponent} from '../../../../shared/components/mer-filter/mehr-filter.component';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent,} from 'ng-zorro-antd/form';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {NzTreeSelectComponent} from 'ng-zorro-antd/tree-select';
import {IVendorModel} from '../../../../shared/interfaces/vendor.model';
import {NzTreeNodeOptions} from 'ng-zorro-antd/core/tree';
import {PublishableStatusesLabel} from '../../enums/publishable-statuses.enum';
import {IUserModel} from '../../../../auth/interfaces/user.model';
import {EnumConvertorUtils} from '../../../../shared/Utils/EnumConvertoModel';
import {IEnvironmentModel} from '../../../../shared/interfaces/environment.model';
import {FilterOptionUtils} from '../../../../shared/Utils/filterOption';
import {DateConvertorUtil} from '../../../../shared/Utils/DateConvertorUtil';

@Component({
    selector: 'admin-products-list',
  imports: [
    ReactiveFormsModule,
    NzModalModule,
    NzDropDownModule,
    NzButtonModule,
    NzMenuModule,
    NzIconModule,
    QlandTableComponent,
    MehrFilterComponent,
    FormsModule,
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
  ],
    templateUrl: './products-list.component.html',
    styleUrl: './products-list.component.scss'
})
export class ProductsListComponent implements OnInit, OnDestroy {
  isAdmin = false;
  user!: IUserModel;
  total = 0;
  pageIndex = 1;
  pageSize = 10;
  sortOrder!: any;
  sortField!: string | undefined;
  loading = false;
  listOfData!: IProductsListModel[];
  filters: any = {};
  gridOptions!: TableColumn[];
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
  private readonly _destroy = new Subject<void>();

  constructor(
    private productService: ProductService,
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    @Inject('environment') private environment: IEnvironmentModel,
  ) {
    this.isAdmin = RoleUtil.isAdmin();
    this.user = authService.getUserAuthenticated();
    this.initForm();
  }

  ngOnInit() {
    this.gridOption();
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
  onTableQueryParamsChange(params: NzTableQueryParams) {
    const { pageSize, pageIndex, sort, filter } = params;
    this.pageSize = pageSize;
    this.pageIndex = pageIndex;
    const currentSort = sort.find((item) => item.value !== null);
    const sortField = (this.sortField = currentSort?.key);
    const sortOrder = (this.sortOrder = currentSort?.value);
    this.loadData(this.filters, pageSize, pageIndex, sortField, sortOrder);
  }

  getProducts(params: HttpParams) {
    this.loading = true;
    return this.productService
      .products(params)
      .pipe(
        takeUntil(this._destroy),
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe((data) => {
        this.total = data.totalCount;
        this.listOfData = data.items;
      });
  }

  onFilterChanged(filters: any) {
    this.filters = filters;
    this.loadData(
      filters,
      this.pageSize,
      this.pageIndex,
      this.sortField,
      this.sortOrder,
    );
  }

  loadData(
    filter: Array<{
      key: string;
      value: string[];
    }>,
    pageSize: number | null,
    pageIndex: number | null,
    sortField: string | undefined | null,
    sortOrder: any | null,
  ) {
    let params = FilterOptionUtils.getHttpParams(
      pageIndex ?? this.pageIndex,
      pageSize ?? this.pageSize,
      sortField ?? this.sortField,
      sortOrder ?? this.sortOrder,
      filter,
    );
    this.getProducts(params);
  }

  private doActionButton(event: any) {
    switch (event.action) {
      case 'show':
        {
          this.router.navigate(['/pages/product', event.rowData.id]);
        }
        break;
      case 'edit':
        this.router.navigate(['/pages/product/edit', event.rowData.id]);
        break;
      default:
        this.router.navigate([
          '/pages/product/edit',
          event.rowData.id,
          'price',
        ]);
    }
  }

  gridOption() {
    this.gridOptions = [
      {
        headerName: 'تصویر شاخص',
        key: 'imageSrc',
        width: '100',
        cellRenderer: (params) => {
          return `<img src="${this.environment.apiUrl}${params.imageSrc}"  alt="f">`;
        },
      },
      {
        headerName: 'عنوان محصول',
        key: 'persianTitle',
        width: '320',
        valueFormatter: (params) =>
          `${params.persianTitle} ${params.englishTitle}`,
      },
      {
        headerName: 'کدمحصول',
        key: 'code',
      },
      {
        headerName: 'تاریخ ایجاد',
        key: 'createDate',

        valueFormatter: (params) =>
          DateConvertorUtil.toPersianDate(params.createDate),
        sortable: true,
        sortDirections: ['ascend', 'descend'],
      },
      {
        headerName: 'موجودی',

        key: 'inventory',
        valueFormatter: (params) =>
          params.isProductExist ? params.inventory : 'ناموجود',
        setClass: (params) => {
          return params.isProductExist ? 'text-success' : 'text-danger';
        },
      },
      {
        headerName: 'پذیرنده',
        key: 'vendorDisplayName',
      },
      {
        headerName: 'وضعیت محصول',
        key: 'isActive',
        width: '150',
        tooltipValueGetter: (params) => (params.isActive ? 'فعال' : 'غیرفعال'),
        cellRenderer: (params) => {
          return `<span class="${params.isActive ? 'fa fa-check text-success' : 'fa fa-close text-danger'}"></span>`;
        },
      },
      {
        headerName: 'وضعیت انتشار',
        key: 'isPublishable',
        setClass: (params) =>
          params.isPublishable ? 'text-success' : 'text-danger',
        valueFormatter: (params) => {
          switch (params.isPublishable) {
            case true:
              return 'منتشر شده';
            case false:
              return 'منتشر نشده';
            default:
              return 'در انتظار انتشار';
          }
        },
      },
      {
        headerName: 'عملیات',
        key: 'action',
        sortable: false,
        cellRendererParams: {
          buttons: [
            {
              label: 'مشاهده',
              action: 'show',
              type: 'default',
              icon: 'eye',
              colorBtn: 'green',
            },
            {
              label: 'ویرایش',
              action: 'edit',
              type: 'primary',
              icon: 'edit',
              colorBtn: 'orange',
              isHidden: (params: any) =>
                params.vendorId !== this.user.id && !this.isAdmin,
            },
            {
              label: 'قیمت گذاری',
              action: 'edit-price',
              colorBtn: 'green',
              icon: 'dollar',
            },
          ],
          onClick: (event: any) => this.doActionButton(event),
        },
      },
    ];
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
