import { Component, DestroyRef, EventEmitter, OnInit } from '@angular/core';
import { TableColumn } from '../../../../shared/interfaces/qland-table.model';
import { ManagementService } from '../../services/management.service';
import { IManagementCommentResponseModel } from '../../interfaces/management-comments.model';
import { QlandTableComponent } from '../../../../shared/components/qland-table/qland-table.component';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { FilterOptionUtils } from '../../../../shared/Utils/filterOption';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { DateConvertorUtil } from '../../../../shared/Utils/DateConvertorUtil';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { SlicePipe } from '@angular/common';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ViewCommentInformationDialogComponent } from '../view-comment-information-dialog/view-comment-information-dialog.component';
import { HttpParams } from '@angular/common/http';
import { CommentsSearchComponent } from '../comments-search/comments-search.component';
import { ProductCommentRatingLabel } from '../../../../shared/enums/product-comment-rating';
import { EnumLabelPipe } from '../../../../shared/pipes/enum-label.pipe';

@Component({
  selector: 'admin-management-comments-list',
  imports: [QlandTableComponent, CommentsSearchComponent],
  providers: [EnumLabelPipe, SlicePipe, NzModalService],
  templateUrl: './management-comments-list.component.html',
  styleUrl: './management-comments-list.component.scss',
})
export class ManagementCommentsListComponent implements OnInit {
  gridOptions!: TableColumn[];
  total = 1;
  pageIndex = 1;
  pageSize = 10;
  loading = false;
  listOfData!: IManagementCommentResponseModel[];
  private filters!: any;
  private sortOrder!: any;
  private sortField!: string | undefined;
  productId!: number;
  params!: NzTableQueryParams;

  constructor(
    private managementService: ManagementService,
    private destroyRef: DestroyRef,
    private toastr: ToastrService,
    private activateRoute: ActivatedRoute,
    private enumLabelPipe: EnumLabelPipe,
    private slice: SlicePipe,
    private modal: NzModalService,
  ) {
    this.productId = activateRoute.snapshot.params['id'];
  }

  ngOnInit() {
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

  private getComments(params: HttpParams) {
    this.loading = true;
    return this.managementService
      .comments(params)
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

  loadData(
    filter: Array<{ key: string; value: string[] }>,
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
    this.getComments(params);
  }

  private gridOption() {
    this.gridOptions = [
      {
        headerName: 'عنوان محصول ',
        key: 'productTitle',
        tooltipValueGetter: (params) => params.productTitle,
        valueFormatter: (params) =>
          `${this.slice.transform(params.productTitle, 0, 20)} ${params.productTitle.length > 20 ? '...' : ''}`,
      },
      {
        headerName: 'نام مشتری ',
        key: 'customerFullName',
      },
      {
        headerName: 'خریدار',
        key: 'isBuyer',
        tooltipValueGetter: (params) =>
          params.isBuyer ? 'می باشد' : 'نمی باشد',
        cellRenderer: (params) => {
          return `<span class="${params.isBuyer ? 'fa fa-check text-success' : 'fa fa-close text-danger'}"></span>`;
        },
      },
      {
        headerName: 'امتیاز',
        key: 'rating',
        valueFormatter: (params) =>
          this.enumLabelPipe.transform(
            params.rating,
            ProductCommentRatingLabel,
          ),
      },
      {
        headerName: 'عنوان نظر',
        key: 'title',
        tooltipValueGetter: (params) => params.title,
        valueFormatter: (params) =>
          `${this.slice.transform(params.title, 0, 20)} ${params.title.length > 20 ? '...' : ''}`,
      },
      {
        headerName: 'وضعیت انتشار',
        key: 'isAllowedToShow',
        setClass: (params) =>
          params.isAllowedToShow ? 'text-success' : 'text-danger',
        valueFormatter: (params) => {
          switch (params.isAllowedToShow) {
            case true:
              return 'منتشر شده';
            case false:
              return 'منتشر نشده';
            default:
              return 'منتشر نشده';
          }
        },
      },
      {
        headerName: 'تاریخ',
        key: 'createDate',
        valueFormatter: (params) =>
          DateConvertorUtil.toPersianDate(params.createDate),
        sortable: true,
        sortDirections: ['ascend', 'descend'],
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
              colorBtn: 'success',
            },
            {
              label: 'انتشار',
              action: 'allow',
              type: 'primary',
              icon: 'tags',
              colorBtn: 'orange',
              isHidden: (params: any) => {
                return params.isAllowedToShow;
              },
            },

            {
              label: 'عدم انتشار',
              action: 'isNotAllow',
              type: 'primary',
              icon: 'tags',
              colorBtn: 'orange',
              isHidden: (params: any) => {
                return !params.isAllowedToShow;
              },
            },
            {
              label: 'حذف',
              action: 'delete',
              colorBtn: 'red',
              icon: 'close',
            },
          ],
          onClick: (event: any) => this.doActionButton(event),
        },
      },
    ];
  }

  private doActionButton(event: any) {
    switch (event.action) {
      case 'show':
        {
          this.viewInformation(event.rowData);
        }
        break;
      case 'allow':
        {
          this.confirmComment(event.rowData);
        }
        break;
      case 'isNotAllow':
        {
          this.rejectionComment(event.rowData);
        }
        break;
      case 'delete':
        {
          this.clearComment(event.rowData);
        }
        break;
      default:
        return;
    }
  }

  confirmComment(params: any): void {
    this.managementService
      .allowComment(params.productCustomerCommentId, params.productId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.toastr.success('عملیات با موفقیت انجام شد.');
        this.loadData(
          this.filters,
          this.pageSize,
          this.pageIndex,
          this.sortField,
          this.sortOrder,
        );
      });
  }

  rejectionComment(params: any): void {
    this.managementService
      .isNotAllowComment(params.productCustomerCommentId, params.productId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.toastr.success('عملیات با موفقیت انجام شد.');
        this.loadData(
          this.filters,
          this.pageSize,
          this.pageIndex,
          this.sortField,
          this.sortOrder,
        );
      });
  }

  clearComment(params: any): void {
    this.modal.confirm({
      nzTitle: `آیا از حذف این نظر مطمئن هستید؟`,
      nzOkText: 'بله',
      nzCancelText: 'خیر',
      nzOnOk: () => {
        this.managementService
          .deleteComment(params.productCustomerCommentId, params.productId)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe(() => {
            this.toastr.success('عملیات با موفقیت انجام شد.');
            this.loadData(
              this.filters,
              this.pageSize,
              this.pageIndex,
              this.sortField,
              this.sortOrder,
            );
          });
      },
      nzOnCancel: () => {
        this.loading = false;
      },
    });
  }

  viewInformation(listOfData: IManagementCommentResponseModel) {
    this.modal.create({
      nzTitle: 'اطلاعات نظر',
      nzData: {
        data: listOfData,
      },
      nzContent: ViewCommentInformationDialogComponent,
      nzAfterClose: new EventEmitter<boolean>(),
      nzWidth: '60vw',
      nzFooter: null,
    });
  }
}
