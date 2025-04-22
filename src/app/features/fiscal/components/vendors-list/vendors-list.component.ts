import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { PricePipe } from '../../../../shared/pipes/price.pipe';
import { HttpParams } from '@angular/common/http';
import { finalize, Subject, takeUntil } from 'rxjs';
import { FiscalService } from '../../services/fiscal.service';
import { IVendorsListModel } from '../../interfaces/vendors-list.model';
import { FilterOptionUtils } from '../../../../shared/Utils/filterOption';
import { Router } from '@angular/router';
import { QlandTableComponent } from '../../../../shared/components/qland-table/qland-table.component';
import { TableColumn } from '../../../../shared/interfaces/qland-table.model';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'admin-vendors-list',
  imports: [QlandTableComponent],
  providers: [NzModalService, PricePipe],
  templateUrl: './vendors-list.component.html',
  styleUrl: './vendors-list.component.scss',
})
export class VendorsListComponent implements OnDestroy, OnInit {
  listVendors!: IVendorsListModel[];

  total = 1;
  pageIndex = 1;
  pageSize = 10;
  sortOrder!: any;
  sortField!: string | undefined;
  loading = false;
  filters: any = {};
  gridOptions!: TableColumn[];

  private readonly _destroy = new Subject<void>();

  constructor(
    private fiscalService: FiscalService,
    private currencyPipe: PricePipe,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.gridOption();
  }

  getVendors(params: HttpParams) {
    this.loading = true;
    return this.fiscalService
      .vendorsList(params)
      .pipe(
        takeUntil(this._destroy),
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe((data) => {
        this.total = data.totalCount;
        this.listVendors = data.items;
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
    this.getVendors(params);
  }

  private doActionButton(event: any) {
    switch (event.action) {
      case 'settlement':
        {
          this.router.navigate(['/pages/fiscal', event.rowData.vendorId]);
        }
        break;
      default:
        return;
    }
  }

  gridOption() {
    this.gridOptions = [
      {
        headerName: 'نام فروشگاه',
        key: 'displayName',
      },
      {
        headerName: 'تعداد فاکتور',
        key: 'countOfUnSettled',
      },
      {
        headerName: 'جمع فروش (ریال)',
        key: 'totalSaleAmount',
        valueFormatter: (params) =>
          this.currencyPipe.transform(params.totalSaleAmount),
      },
      {
        headerName: 'عملیات',
        key: 'action',
        sortable: false,
        cellRendererParams: {
          buttons: [
            {
              label: 'تسویه',
              action: 'settlement',
              type: 'primary',
              isDisabled: (event: IVendorsListModel) => {
                return !event.isSettlement;
              },
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
