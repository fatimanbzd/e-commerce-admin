import { Component, DestroyRef, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderSearchComponent } from '../order-search/order-search.component';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { HttpParams } from '@angular/common/http';
import { finalize } from 'rxjs';
import { OrderService } from '../../services/order.service';
import { IOrdersListModel } from '../../interfaces/orders-list.model';
import { RoleUtil } from '../../../../shared/Utils/role-base';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { orderStatus } from '../../../product/pipes/payment-status.pipe';
import { QlandTableComponent } from '../../../../shared/components/qland-table/qland-table.component';
import { TableColumn } from '../../../../shared/interfaces/qland-table.model';
import { Router } from '@angular/router';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import {EnumLabelPipe} from '../../../../shared/pipes/enum-label.pipe';
import {PricePipe} from '../../../../shared/pipes/price.pipe';
import {InvoiceStatusLabel} from '../../../../shared/enums/invoice-status.enum';
import {FilterOptionUtils} from '../../../../shared/Utils/filterOption';
import {DateConvertorUtil} from '../../../../shared/Utils/DateConvertorUtil';
import {downloadFileHelper} from '../../../../shared/Utils/downloadFileHeper';

@Component({
  selector: 'admin-order-list',
  imports: [
    ReactiveFormsModule,
    OrderSearchComponent,
    QlandTableComponent,
    NzButtonComponent,
    NzIconDirective,
  ],
  providers: [orderStatus, EnumLabelPipe, PricePipe],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss',
})
export class OrderListComponent implements OnInit {
  listOfOrder!: IOrdersListModel[];
  isAdmin = false;
  total = 1;
  pageIndex = 1;
  pageSize = 10;
  sortOrder!: any;
  sortField!: string | undefined;
  loading = false;
  filters: any = {};
  gridOptions!: TableColumn[];

  protected readonly InvoiceStatusLabel = InvoiceStatusLabel;

  constructor(
    private orderService: OrderService,
    private destroyRef: DestroyRef,
    private currencyPipe: PricePipe,
    private enumLabelPipe: EnumLabelPipe,
    private PaidPipe: orderStatus,
    private router: Router,
  ) {
    this.isAdmin = RoleUtil.isAdmin();
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

  getOrders(params: HttpParams) {
    this.loading = true;
    return this.orderService
      .orders(params)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe((data) => {
        this.total = data.totalCount;
        this.listOfOrder = data.items;
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
    this.getOrders(params);
  }

  private doActionButton(event: any) {
    switch (event.action) {
      case 'show':
        {
          this.router.navigate(['/pages/order', event.rowData.id]);
        }
        break;

      default:
        return;
    }
  }

  gridOption() {
    this.gridOptions = [
      {
        headerName: 'نام سفارش دهنده',
        key: 'customerFullName',
      },
      {
        headerName: 'شماره سفارش',
        key: 'invoiceNumber',
      },
      {
        headerName: 'تاریخ ثبت سفارش',
        key: 'invoiceRegisterDate',

        valueFormatter: (params) =>
          DateConvertorUtil.toPersianDate(params.invoiceRegisterDate),
        sortable: true,
        sortDirections: ['ascend', 'descend'],
      },
      {
        headerName: 'قیمت کل (ریال)',
        key: 'invoiceTotalAmount',
        valueFormatter: (params) =>
          this.currencyPipe.transform(params.invoiceTotalAmount),
      },
      {
        headerName: 'وضعیت سفارش',
        key: 'invoiceState',
        valueFormatter: (params) =>
          this.enumLabelPipe.transform(params.invoiceState, InvoiceStatusLabel),
      },
      {
        headerName: 'وضعیت پرداخت',
        key: 'paid',
        valueFormatter: (params) => this.PaidPipe.transform(params.paid),
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
    if (this.isAdmin) {
      this.gridOptions.splice(1, 0, {
        headerName: 'پذیرندگان',
        key: 'vendors',
      });
    }
  }
  export() {
    let params = FilterOptionUtils.getHttpParams(
      this.pageIndex,
      this.pageSize,
      this.sortField,
      this.sortOrder,
      [],
    );

    this.orderService
      .export(params)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        downloadFileHelper(data);
      });
  }
}
