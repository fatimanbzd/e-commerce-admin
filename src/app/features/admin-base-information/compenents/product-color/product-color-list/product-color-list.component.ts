import {Component, DestroyRef, EventEmitter, OnInit} from '@angular/core';
import {
  NzTableQueryParams,
} from 'ng-zorro-antd/table';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzFlexDirective } from 'ng-zorro-antd/flex';
import {
  NzModalModule,
  NzModalService,
} from 'ng-zorro-antd/modal';
import { FormsModule } from '@angular/forms';
import { finalize, Subject, takeUntil } from 'rxjs';

import { ToastrService } from 'ngx-toastr';
import { ProductColorCreateDialogComponent } from '../product-color-create-dialog/product-color-create-dialog.component';
import { FilterOptionUtils } from '../../../../../shared/Utils/filterOption';
import { ProductColorService } from '../../../services/product-color.service';
import { IProductColor } from '../../../interfaces/product-color.model';
import {QlandTableComponent} from "../../../../../shared/components/qland-table/qland-table.component";
import {TableColumn} from "../../../../../shared/interfaces/qland-table.model";
import {HttpParams} from "@angular/common/http";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
    selector: 'admin-product-color-list',
  imports: [
    NzButtonComponent,
    NzFlexDirective,
    FormsModule,
    NzModalModule,
    QlandTableComponent,
  ],
    templateUrl: './product-color-list.component.html',
    styleUrl: './product-color-list.component.scss'
})
export class ProductColorListComponent implements  OnInit {
  listOfData!: IProductColor[];
  total = 1;
  pageIndex = 1;
  pageSize = 10;
  sortOrder!: any;
  sortField!: string | undefined;
  loading = false;
  filters: any = {};
  gridOptions!: TableColumn[];


  private _destroy = new Subject<void>();

  constructor(
    private toastr: ToastrService,
    private modal: NzModalService,
    private colorService: ProductColorService,
    private destroyRef: DestroyRef,
  ) {}

  ngOnInit(): void {
    this.gridOption();
  }


  getColors(params: HttpParams) {
    this.loading = true;

    return this.colorService
      .colors(params)
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

  onTableQueryParamsChange(params: NzTableQueryParams) {
    const { pageSize, pageIndex, sort, filter } = params;
    this.pageSize = pageSize;
    this.pageIndex = pageIndex;
    const currentSort = sort.find((item) => item.value !== null);
    const sortField = (this.sortField = currentSort?.key);
    const sortOrder = (this.sortOrder = currentSort?.value);
    this.loadData(this.filters, pageSize, pageIndex, sortField, sortOrder);
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
    this.getColors(params);
  }


  private doActionButton(event: any) {
    switch (event.action) {
      case 'edit':
      {
       this.openColorDialog(event.rowData.id)
      }
        break;
      case 'delete':
      {
        this.clearColor(event.rowData)
      }
        break;
      default:
        return;
    }
  }

  gridOption() {
    this.gridOptions = [
      {
        headerName: 'عنوان',
        key: 'name',
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

  openColorDialog(id?: number) {
    const modalRef = this.modal.create({
      nzTitle: id ? 'ویرایش رنگ' : 'رنگ جدید',
      nzData: {
        id: id,
      },
      nzContent: ProductColorCreateDialogComponent,
      nzAfterClose: new EventEmitter<boolean>(),
    });
    modalRef.afterClose.pipe(takeUntil(this._destroy)).subscribe((result) => {
      if (result) {
        this.onAfterClose();
        this.pageIndex = 1;
        this.loadData(this.filters, this.pageSize, this.pageIndex, this.sortField, this.sortOrder);
      }
    });
  }


  clearColor(params: any): void {
    this.modal.confirm({
      nzTitle: `آیا از حذف این نظر مطمئن هستید؟`,
      nzOkText: 'بله',
      nzCancelText: 'خیر',
      nzOnOk: () => {
        this.colorService.deleteColor(params.id)
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

  onAfterClose(): void {
    this.toastr.success('اطلاعات با موفقیت ثبت شد');
  }

}
