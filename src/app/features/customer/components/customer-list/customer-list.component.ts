import { Component, OnInit, ViewChild } from '@angular/core';
import { NzTableModule, NzTableQueryParams } from 'ng-zorro-antd/table';
import { CustomerService } from '../../services/customer.service';
import { finalize, Subject, takeUntil } from 'rxjs';
import { ICustomerResponseModel } from '../../interfaces/customer.model';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FilterOptionUtils } from '@core/Utils/filterOption';
import { QlandTableComponent } from '../../../../shared/components/qland-table/qland-table.component';
import { TableColumn } from '../../../../shared/interfaces/qland-table.model';
import { HttpParams } from '@angular/common/http';
import { CustomerSearchComponent } from '../customer-search/customer-search.component';

@Component({
  selector: 'admin-customer-list',
  imports: [
    NzTableModule,
    NzCollapseModule,
    ReactiveFormsModule,
    QlandTableComponent,
    CustomerSearchComponent,
  ],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss',
})
export class CustomerListComponent implements OnInit {
  gridOptions!: TableColumn[];
  total = 1;
  pageIndex = 1;
  pageSize = 10;
  loading = false;
  listOfData!: ICustomerResponseModel[];
  private filters!: any;
  private sortOrder!: any;
  private sortField!: string | undefined;
  productId!: number;
  params!: any;

  private _destroy = new Subject<void>();

  @ViewChild('rowSelectionTable') grid: any;

  constructor(
    private customerService: CustomerService,
    private router: Router,
  ) {}

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

  getCustomers(params: HttpParams) {
    this.params = params;
    this.loading = true;

    return this.customerService
      .customers(params)
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
    this.getCustomers(params);
  }

  private gridOption() {
    this.gridOptions = [
      {
        headerName: 'تصویر',
        key: 'imageSrc',
        width: '100',
        cellRenderer: (params) => {
          return `<img src="assets/images/default.jpg"  alt="${params.fullName}">`;
        },
      },
      {
        headerName: 'نام ',
        key: 'fullName',
        valueFormatter: (params) =>
          params.fullName ? `${params.fullName}` : '-',
      },
      {
        headerName: 'کدملی ',
        key: 'nationalNumber',
        valueFormatter: (params) =>
          params.nationalNumber ? `${params.nationalNumber}` : '-',
      },
      {
        headerName: 'موبایل ',
        key: 'nationalNumber',
        valueFormatter: (params) =>
          params.mobileNumber ? `${params.mobileNumber}` : '-',
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
          this.router.navigate([`/pages/user/${event.rowData.id}`]);
        }
        break;

      default:
        return;
    }
  }
}
