import { Component, DestroyRef, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TableColumn } from '../../../../shared/interfaces/qland-table.model';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { IBillResponseModel } from '../../interfaces/bill-response.model';
import { FilterOptionUtils } from '../../../../shared/Utils/filterOption';
import { finalize } from 'rxjs';
import { QlandTableComponent } from '../../../../shared/components/qland-table/qland-table.component';
import { DateConvertorUtil } from '../../../../shared/Utils/DateConvertorUtil';
import { PricePipe } from '../../../../shared/pipes/price.pipe';
import { downloadFileHelper } from '../../../../shared/Utils/downloadFileHeper';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { BillingSearchComponent } from '../billing-search/billing-search.component';
import { InvoiceItemStatusLabel } from '../../../../shared/enums/invoice-item-status.enum';
import { EnumLabelPipe } from '../../../../shared/pipes/enum-label.pipe';

@Component({
  selector: 'admin-billing-list',
  imports: [
    QlandTableComponent,
    NzButtonComponent,
    NzIconDirective,
    BillingSearchComponent,
  ],
  providers: [PricePipe, EnumLabelPipe],
  templateUrl: './billing-list.component.html',
  styleUrl: './billing-list.component.scss',
})
export class BillingListComponent implements OnInit {
  gridOptions!: TableColumn[];
  total = 1;
  pageIndex = 1;
  pageSize = 10;
  loading = false;
  listOfData!: IBillResponseModel[];
  private sortOrder!: any;
  private sortField!: string | undefined;

  constructor(
    private paymentService: PaymentService,
    private destroyRef: DestroyRef,
    private currencyPipe: PricePipe,
    private enumLabel: EnumLabelPipe,
  ) {}

  ngOnInit() {
    this.gridOption();
  }

  onTableQueryParamsChange(params: NzTableQueryParams) {
    const { pageSize, pageIndex, sort, filter } = params;

    this.pageSize = pageSize;
    this.pageIndex = pageIndex;
    this.loadData(params);
  }

  private loadData(model: NzTableQueryParams) {
    let params = FilterOptionUtils.getHttpParams2(model);

    this.loading = true;
    return this.paymentService
      .bills(params)
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

  private gridOption() {
    this.gridOptions = [
      {
        headerName: 'کد سفارش',
        key: 'invoiceNumber',
      },
      {
        headerName: 'نام محصول',
        key: 'productTitle',
      },
      {
        headerName: 'نام خریدار',
        key: 'customerFullName',
      },
      {
        headerName: 'شماره موبایل',
        key: 'customerMobileNumber',
      },
      {
        headerName: 'وضعیت کالا',
        key: 'sendStatus',
        valueFormatter: (params) =>
          this.enumLabel.transform(params?.sendStatus, InvoiceItemStatusLabel),
      },
      {
        headerName: 'شماره سفارش',
        key: 'invoiceNumber',
      },
      {
        headerName: 'تاریخ صورتحساب',
        key: 'createDate',
        valueFormatter: (params) =>
          DateConvertorUtil.toPersianDate(params.createDate),
        sortable: true,
        sortDirections: ['ascend', 'descend'],
      },
      {
        headerName: ' مبلغ محصولات (ریال)',
        key: 'productPrice',
        valueFormatter: (params) =>
          this.currencyPipe.transform(params.productPrice),
      },
      {
        headerName: 'تخفیف (ریال)',
        key: 'discountAmount',
        valueFormatter: (params) =>
          this.currencyPipe.transform(params.discountAmount),
      },
      {
        headerName: 'مالیات بر ارزش افزوده (ریال)',
        key: 'taxAmount',
        valueFormatter: (params) =>
          this.currencyPipe.transform(params.taxAmount),
      },

      {
        headerName: ' قیمت نهایی (ریال)',
        key: 'lastAmount',
        valueFormatter: (params) =>
          this.currencyPipe.transform(params.lastAmount),
      },
      {
        headerName: 'نام فروشنده',
        key: 'vendorTitle',
      },
      {
        headerName: 'وضعیت پرداخت',
        key: 'paid',
        valueFormatter: (params) =>
          params.paid ? 'پرداخت شده ' : 'پرداخت نشده',
      },
      {
        headerName: 'زمان تسویه',
        key: 'settledDate',
        valueFormatter: (params) =>
          DateConvertorUtil.toPersianDate(params.settledDate),
      },
      {
        headerName: 'وضعیت تسویه',
        key: 'settled',
        valueFormatter: (params) =>
          params.settled ? 'تسویه شده ' : 'تسویه نشده',
      },
      {
        headerName: 'کد ملی خریدار',
        key: 'customerNationalNumber',
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
      case 'show': {
        const url = `${window.location.origin}/#/pages/order/${event.rowData.invoiceId}`;
        window.open(url, '_blank', 'noopener');
      }
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

    this.paymentService
      .export(params)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        downloadFileHelper(data);
      });
  }
}
