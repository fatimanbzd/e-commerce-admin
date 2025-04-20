import { Component, DestroyRef, OnInit } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { IVendorMessageModel } from '../../interfaces/vendorMessage.model';
import { finalize } from 'rxjs';
import { FilterOptionUtils } from '@core/Utils/filterOption';
import { NotificationService } from '../../../../shared/services/notification.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormsModule } from '@angular/forms';
import { SlicePipe } from '@angular/common';
import { QlandTableComponent } from '../../../../shared/components/qland-table/qland-table.component';
import { IUserModel } from '@core/interfaces/user.model';
import { TableColumn } from '../../../../shared/interfaces/qland-table.model';
import { DateConvertorUtil } from '@core/Utils/DateConvertorUtil';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpParams } from '@angular/common/http';
import { VendorMessageDialogComponent } from './vendor-message-dialog/vendor-message-dialog.component';

@Component({
  selector: 'vendor-message',
  imports: [FormsModule, QlandTableComponent],
  providers: [NzModalService, SlicePipe],
  templateUrl: './vendor-message-list.component.html',
  styleUrl: './vendor-message-list.component.scss',
})
export class VendorMessageListComponent implements OnInit {
  isAdmin = false;
  user!: IUserModel;
  total = 1;
  pageIndex = 1;
  pageSize = 10;
  sortOrder!: any;
  sortField!: string | undefined;
  loading = false;
  listOfData!: IVendorMessageModel[];
  filters: any = {};
  columnDefs!: TableColumn[];

  constructor(
    private messageService: NotificationService,
    private modal: NzModalService,
    private destroyRef: DestroyRef,
    private slice: SlicePipe,
  ) {}

  ngOnInit(): void {
    this.gridOption();
  }

  getMessages(params: HttpParams) {
    this.loading = true;

    return this.messageService
      .notifications(params)
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
    this.getMessages(params);
  }

  openModel(data: IVendorMessageModel) {
    this.modal.create({
      nzTitle: data.title,
      nzData: data,
      nzContent: VendorMessageDialogComponent,
    });
  }

  getRowStyle(item: IVendorMessageModel): { [key: string]: string } {
    const styles: { [key: string]: string } = {};
    if (!item.isRead) {
      styles['font-weight'] = 'bold';
    } else {
      styles['font-weight'] = 'normal';
    }
    return styles;
  }

  gridOption() {
    this.columnDefs = [
      {
        headerName: 'عنوان',
        key: 'title',
      },
      {
        headerName: 'تاریخ ثبت',
        key: 'createDate',
        valueFormatter: (params) =>
          params.createDate
            ? DateConvertorUtil.toPersianDate(params.createDate)
            : '-',
        sortable: true,
        sortDirections: ['ascend', 'descend'],
      },
      {
        headerName: 'فرستنده',
        key: 'from',
      },
      {
        headerName: 'پیام',
        key: 'message',
        valueFormatter: (params) =>
          `${this.slice.transform(params.message, 0, 20)} ${params.message.length > 20 ? '...' : ''}`,
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
              type: 'primary',
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
          this.openModel(event.rowData as IVendorMessageModel);
        }
        break;
      default:
        return;
    }
  }
}
