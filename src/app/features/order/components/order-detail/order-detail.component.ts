import {
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  NzDescriptionsComponent,
  NzDescriptionsItemComponent,
} from 'ng-zorro-antd/descriptions';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { ActivatedRoute } from '@angular/router';
import { PersianDatePipe } from '@core/pipes/persian-date.pipe';
import { Subject, takeUntil } from 'rxjs';
import { OrderService } from '../../services/order.service';
import {
  IOrderDetailModel,
  IOrderDetailProductModel,
  ITransactionModel,
} from '../../interfaces/order-detail.model';
import { PricePipe } from '@core/pipes/price.pipe';
import { EnumLabelPipe } from '@core/pipes/enum-label.pipe';
import { FormsModule } from '@angular/forms';
import {
  InvoiceItemStatusEnum,
  InvoiceItemStatusLabel,
} from '@core/enums/invoice-item-status.enum';
import {
  InvoiceStatusEnum,
  InvoiceStatusLabel,
} from '@core/enums/invoice-status.enum';
import { WarrantyCategoryLabel } from '../../../product/enums/warranty-category.enum';
import { RoleUtil } from '../../../../shared/utilities/role-base';
import { PersianDateTimePipe } from '@core/pipes/persian-date-time.pipe';
import { NzRibbonComponent } from 'ng-zorro-antd/badge';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { empty } from '../../../product/pipes/empty.pipe';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ViewOrderDialogComponent } from '../view-order-dialog/view-order-dialog.component';
import { QlandTableComponent } from '../../../../shared/components/qland-table/qland-table.component';
import { TableColumn } from '../../../../shared/interfaces/qland-table.model';
import { IEnvironmentModel } from '@core/interfaces/environment.model';
import { DateConvertorUtil } from '@core/Utils/DateConvertorUtil';

@Component({
  selector: 'admin-order-detail',
  imports: [
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    NzRowDirective,
    NzColDirective,
    NzIconDirective,
    NzButtonComponent,
    PersianDatePipe,
    PricePipe,
    EnumLabelPipe,
    FormsModule,
    PersianDateTimePipe,
    NzRibbonComponent,
    NzCardComponent,
    empty,
    QlandTableComponent,
  ],

  providers: [NzModalService, PricePipe, EnumLabelPipe],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss',
})
export class OrderDetailComponent implements OnInit, OnDestroy {
  gridOptions!: TableColumn[];
  Transaction!: TableColumn[];

  isAdmin = false;
  order!: IOrderDetailModel;
  invoiceId!: number;
  listOfOrder!: IOrderDetailProductModel[];

  listOfTransaction!: ITransactionModel[];
  loading = false;
  total = 1;

  protected readonly WarrantyCategoryLabel = WarrantyCategoryLabel;
  protected readonly InvoiceStatusLabel = InvoiceStatusLabel;
  private readonly _destroy = new Subject<void>();

  constructor(
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private modal: NzModalService,
    @Inject('environment') private environment: IEnvironmentModel,
    private enumLabelPipe: EnumLabelPipe,
    private currencyPipe: PricePipe,
  ) {
    this.isAdmin = RoleUtil.isAdmin();
  }

  ngOnInit() {
    this.getOrder();
    this.gridOption();
    this.gridOptionsTransaction();
  }

  getOrder() {
    this.invoiceId = this.activatedRoute.snapshot.params['id'];
    this.orderService
      .order(this.invoiceId)
      .pipe(takeUntil(this._destroy))
      .subscribe((data) => {
        this.order = data ?? null;
        this.listOfOrder = data.items;
        this.listOfTransaction = data.transactions;
      });
  }

  viewOrder(
    invoiceId: number,
    data: IOrderDetailProductModel,
    newStatus: InvoiceItemStatusEnum,
  ) {
    const modalRef = this.modal.create({
      nzTitle: 'اطلاعات سفارش',
      nzData: {
        invoiceId: invoiceId,
        invoiceItemId: data.invoiceItemId,
        data: data,
        sendStatus: newStatus,
      },

      nzContent: ViewOrderDialogComponent,
      nzAfterClose: new EventEmitter<boolean>(),
      nzWidth: '60vw',
      nzFooter: null,
    });
    modalRef.afterClose.pipe(takeUntil(this._destroy)).subscribe((result) => {
      if (result) {
        this.getOrder();
      }
    });
  }

  private doActionButton(event: any) {
    this.invoiceId = this.activatedRoute.snapshot.params['id'];
    switch (event.action) {
      case 'show':
        {
          this.viewOrder(
            this.invoiceId,
            event.rowData,
            event.rowData.sendStatus,
          );
        }
        break;
      case 'edit':
        this.viewOrder(this.invoiceId, event.rowData, event.rowData.sendStatus);
        break;
      default:
        return;
    }
  }

  gridOption() {
    this.gridOptions = [
      {
        headerName: 'تصویر',
        key: 'imageSrc',
        width: '100',
        cellRenderer: (params) => {
          return `<img src="${this.environment.apiUrl}${params.imageSrc}"  alt="f">`;
        },
      },
      {
        headerName: 'نام محصول',
        key: 'persianTitle',
        width: '320',
        cellRenderer: (params) =>
          `<div class="text-start justify-content-start" style="font-weight: 600">
              <p class="mb-1 fw-bold" >${params.productTitle}</p>
               <p  class="mb-1">رنگ: ${params.productPriceColorName}</p>
              <p  class="mb-1">گارانتی: ${this.enumLabelPipe.transform(params.productGuaranty, WarrantyCategoryLabel)}</p>
              <p  class="mb-1"> پذیرنده: ${params.productVendorTitle}</p>
</div>`,
      },
      {
        headerName: 'تعداد',
        key: 'count',
      },
      {
        headerName: 'قیمت واحد (ریال)',
        key: 'price',
        valueFormatter: (params) => this.currencyPipe.transform(params.price),
      },
      {
        headerName: 'قیمت کل',
        key: 'count * price',

        valueFormatter: (params) => {
          const count = params.count || 0;
          const price = params.price || 0;
          const total = count * price;
          return this.currencyPipe.transform(total);
        },
      },
      {
        headerName: 'قیمت نهایی',
        key: 'lastAmount',
        valueFormatter: (params) =>
          this.currencyPipe.transform(params.lastAmount),
      },
      {
        headerName: 'پذیرنده',
        key: 'productVendorTitle',
        width: '150',
      },
      {
        headerName: 'وضعیت کالا/خدمت',
        key: 'sendStatus',
        valueFormatter: (params) =>
          this.enumLabelPipe.transform(
            params.sendStatus,
            InvoiceItemStatusLabel,
          ),
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
              isHidden: (params: any) => {
                return !(
                  params.sendStatus === InvoiceItemStatusEnum.delivered ||
                  params.sendStatus === InvoiceItemStatusEnum.lackOfSupply
                );
              },
            },
            {
              label: 'ویرایش',
              action: 'edit',
              type: 'primary',
              isHidden: (params: any) =>
                !(
                  params.sendStatus !== InvoiceItemStatusEnum.delivered &&
                  params.sendStatus !== InvoiceItemStatusEnum.lackOfSupply
                ),
              isDisabled: (params: any) => {
                return (
                  params.invoiceState !== InvoiceStatusEnum.register ||
                  params.invoiceState !== InvoiceStatusEnum.paying
                );
              },
            },
          ],
          onClick: (event: any) => this.doActionButton(event),
        },
      },
    ];
  }

  gridOptionsTransaction() {
    this.Transaction = [
      {
        headerName: 'مبلغ (ریال)',
        key: 'totalAmount',
        valueFormatter: (params) =>
          this.currencyPipe.transform(params.totalAmount),
      },

      {
        headerName: 'تاریخ',
        key: 'createDate',
        valueFormatter: (params) =>
          DateConvertorUtil.toPersianDate(params.createDate),
      },
      {
        headerName: 'توضیحات',
        key: 'description',
      },
    ];
  }

  onPrintInvoice() {
    const printContent = document.getElementById('receipt-content')?.innerHTML;
    const printWindow = window.open(``, `_blank`);

    if (printWindow) {
      printWindow.document.write(
        '<html lang="fa"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>چاپ فاکتور</title>' +
          '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">\n' +
          '<link rel="stylesheet" href="/assets/fonts/font.css">\n',
      );
      printWindow.document.write('<style>');
      printWindow.document.write(
        '@page{ size: A5 landscape;  margin: 0;}' +
          ' .receipt-container {  width: 100%;' +
          '            height: auto;' +
          '            box-sizing: border-box;' +
          '            padding: 10px;   }',
      );
      printWindow.document.write(`

body {
    font-family:  samim, serif !important;
    margin: 0;
    padding-top: 10px;
font-size: 13px !important;
      justify-content: center;
            align-items: center;
            height: 100vh;
            overflow: hidden;
}
.print-header{
   width: 95%;
margin: 0 auto;
}
.print-title {

    margin-bottom: 0.4rem;
}

strong.title {
  margin-bottom: 5px;
  display: block;
    text-wrap: none;
    display: inline-block
}
.print-factor {
    border: 1px solid #b8c2cc;
    padding: 25px;
    margin-right: 4px;
}
.table{
font-size: 12px;
text-align: center;
}

.factor-table-color h6 {
    color: #626262;
}

.factor-table-color {
    background-color: #dde2e1;
}

.print-border {
    border: 2px solid #6e7275 !important;
}

.print-border-top {
    border-top: 2px solid #6e7275 !important;
}

.print-border-right {
    border-right: 2px solid #6e7275 !important;
}

.line-height-2 {
    line-height: 2;
}`);
      printWindow.document.write('</style></head><body>');
      printWindow.document.write(printContent || '');
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
