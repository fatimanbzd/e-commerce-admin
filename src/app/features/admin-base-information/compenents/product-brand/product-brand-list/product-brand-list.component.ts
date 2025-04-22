import {Component, DestroyRef, EventEmitter, OnInit} from '@angular/core';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import {  NzFlexDirective } from 'ng-zorro-antd/flex';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { finalize } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ProductBrandService } from '../../../services/product-brand.service';
import { IProductBrand } from '../../../interfaces/product-brand.model';
import { ProductBrandCreateDialogComponent } from '../product-brand-create-dialog/product-brand-create-dialog.component';
import { FilterOptionUtils } from '../../../../../shared/Utils/filterOption';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {QlandTableComponent} from "../../../../../shared/components/qland-table/qland-table.component";
import {TableColumn} from "../../../../../shared/interfaces/qland-table.model";
import {HttpParams} from "@angular/common/http";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {ProductBrandSearchComponent} from "../product-brand-search/product-brand-search.component";

@Component({
  selector: 'admin-product-brand-list',
  imports: [
    NzButtonComponent,
    NzFlexDirective,
    FormsModule,
    ReactiveFormsModule,
    QlandTableComponent,
    ProductBrandSearchComponent,
  ],
  providers: [NzModalService],
  templateUrl: './product-brand-list.component.html',
  styleUrl: './product-brand-list.component.scss',
})
export class ProductBrandListComponent implements OnInit {
  gridOptions!: TableColumn[];
  total = 1;
  pageIndex = 1;
  pageSize = 10;
  loading = false;
  listOfData!: IProductBrand[];
  private filters!: any;
  private sortOrder!: any;
  private sortField!: string | undefined;
  productId!: number;
  params!: NzTableQueryParams;


  constructor(
    private toastr: ToastrService,
    private modal: NzModalService,
    private brandService: ProductBrandService,
    private destroyRef: DestroyRef,
  ) {}

  ngOnInit(): void {
    this.gridOption();
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

  getBrands(params: HttpParams) {
    this.loading = true;

    return this.brandService
      .brands(params)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
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

  loadData( filter: Array<{ key: string; value: string[]; }>,
            pageSize: number | null,
            pageIndex: number | null,
            sortField: string | undefined | null,
            sortOrder: any | null,) {
    let params = FilterOptionUtils.getHttpParams(
      pageIndex ?? this.pageIndex,
      pageSize ?? this.pageSize,
      sortField ?? this.sortField,
      sortOrder ?? this.sortOrder,
      filter,
    );
    this.getBrands(params);
  }

  gridOption() {
    this.gridOptions = [
      {
        headerName: 'نام (فارسی)',
        key: 'persianTitle',
      },
      {
        headerName: 'نام (انگلیسی)',
        key: 'englishTitle',
      },
      {
        headerName: 'وضعیت',
        key: 'isActive',
        tooltipValueGetter: (params) => (params.isActive ? 'فعال' : 'غیرفعال'),
        cellRenderer: (params) => {
          return `<span class="${params.isActive ? 'fa fa-check text-success' : 'fa fa-close text-danger'}"></span>`;
        },
      },

      {
        headerName: 'عملیات',
        key: 'action',
        sortable: false,
        cellRendererParams: {
          buttons: [
            {
              label: 'ویرایش',
              action: 'edit',
              type: 'primary',
            },
            {
              label: 'حذف',
              action: 'delete',
              type: 'default',
            },

          ],
          onClick: (event: any) => this.doActionButton(event),
        },
      },
    ];
  }

  private doActionButton(event: any) {
    switch (event.action) {
      case 'edit':
      {
        this.openBrandDialog(event.rowData.id)
      }
        break;
      case 'delete':
      {
        this.clearBrand(event.rowData)
      }
        break;
      default:
        return;
    }
  }

  clearBrand(params: any): void {
    this.modal.confirm({
      nzTitle: `آیا از حذف این نظر مطمئن هستید؟`,
      nzOkText: 'بله',
      nzCancelText: 'خیر',
      nzOnOk: () => {
        this.brandService.deleteBrand(params.id)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe(() => {
            this.toastr.success('حذف با موفقیت انجام شد.');
            this.loadData(this.filters, this.pageSize, this.pageIndex, this.sortField, this.sortOrder);
          });
      },
      nzOnCancel: () => {
        this.loading = false;
      },
    });
  }

  openBrandDialog(id?: number) {
    const modalRef = this.modal.create({
      nzTitle: id ? 'ویرایش برند' : 'برند جدید',
      nzData: {
        id: id,
      },
      nzContent: ProductBrandCreateDialogComponent,
      nzAfterClose: new EventEmitter<boolean>(),
    });
    modalRef.afterClose.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((result) => {
      if (result) {
        this.onAfterClose();
        this.loadData(this.filters, this.pageSize, this.pageIndex, this.sortField, this.sortOrder);
      }
    });
  }

  onAfterClose(): void {
    this.toastr.success('اطلاعات با موفقیت ثبت شد');
  }
}
