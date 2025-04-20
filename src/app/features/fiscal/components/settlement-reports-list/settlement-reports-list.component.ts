import {Component, DestroyRef, OnInit} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {finalize} from 'rxjs';
import {FiscalService} from '../../services/fiscal.service';
import {FilterOptionUtils} from '@core/Utils/filterOption';
import {
  ISettlementFilterModel,
  ISettlementReportsListModel,
} from '../../interfaces/settlement-reports-list.model';
import {EnumLabelPipe} from '@core/pipes/enum-label.pipe';
import {
  NzTableQueryParams,
} from 'ng-zorro-antd/table';
import {PricePipe} from '@core/pipes/price.pipe';
import {SettlementReportsSearchComponent} from '../settlement-reports-search/settlement-reports-search.component';
import {VendorBalanceTypeLabel} from "../../enums/vendor-balance-type.enums";
import {DateConvertorUtil} from "@core/Utils/DateConvertorUtil";
import {QlandTableComponent} from "../../../../shared/components/qland-table/qland-table.component";
import {TableColumn} from "../../../../shared/interfaces/qland-table.model";

@Component({
  selector: 'admin-settlement-reports-list',
  imports: [
    SettlementReportsSearchComponent,
    QlandTableComponent,
  ],
  providers: [PricePipe, EnumLabelPipe],
  templateUrl: './settlement-reports-list.component.html',
  styleUrl: './settlement-reports-list.component.scss'
})
export class SettlementReportsListComponent implements OnInit {
  total = 1;
  pageIndex = 1;
  pageSize = 10;
  loading = false;
  listOfReports!: ISettlementReportsListModel[];
  filter!: ISettlementFilterModel;
  gridOptions!: TableColumn[];
  private filters!: any;
  private sortOrder!: any;
  private sortField!: string | undefined;

  protected readonly VendorBalanceTypeLabel = VendorBalanceTypeLabel;

  constructor(
    private fiscalService: FiscalService,
    private destroyRef: DestroyRef,
    private currencyPipe: PricePipe,
    private enumLabelPipe: EnumLabelPipe
  ) {
  }

  ngOnInit() {
    this.gridOption();
  }

  onTableQueryParamsChange(params: NzTableQueryParams) {
    const {pageSize, pageIndex, sort, filter} = params;
    this.pageSize = pageSize;
    this.pageIndex = pageIndex;
    const currentSort = sort.find((item) => item.value !== null);
    const sortField = (this.sortField = currentSort?.key);
    const sortOrder = (this.sortOrder = currentSort?.value);
    this.loadData(this.filters, pageSize, pageIndex, sortField, sortOrder);
  }

  private loadData(
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
    this.loading = true;
    return this.fiscalService
      .settlementReport(params)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe((data) => {
        this.total = data.totalCount;
        this.listOfReports = data.items;
      });
  }

  private gridOption() {
    this.gridOptions = [
      {
        headerName: 'نوع تراکنش',
        key: 'vendorBalanceType',
        width: '170',
        valueFormatter: (params) =>
          this.enumLabelPipe.transform(params.vendorBalanceType, VendorBalanceTypeLabel)
      },
      {
        headerName: 'نام پذیرنده',
        key: 'vendorTitle',
      },
      {
        headerName: 'مبلغ (ریال)',
        key: 'amount',
        width: '170',
        valueFormatter: (params) =>
          this.currencyPipe.transform(params.amount),
      },
      {
        headerName: 'تاریخ',
        key: 'createDate',
        width: '170',
        valueFormatter: (params) =>
          DateConvertorUtil.toPersianDate(params.createDate),
        sortable: true,
        sortDirections: ['ascend', 'descend'],
      },
      {
        headerName: 'توضیحات',
        key: 'description',
      },
    ];
  }

  onFilterChanged(filters: any) {
    this.filters = filters;
    this.loadData(
      filters,
      10,
      1,
      this.sortField,
      this.sortOrder,
    );
  }
}
