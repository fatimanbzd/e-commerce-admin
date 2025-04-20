import { Component, DestroyRef, OnInit } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ISettlementListModel } from '../../interfaces/settlement-list.model';
import { FilterOptionUtils } from '@core/Utils/filterOption';
import { FiscalService } from '../../services/fiscal.service';
import { HttpParams } from '@angular/common/http';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { PricePipe } from '@core/pipes/price.pipe';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { ToastrService } from 'ngx-toastr';
import { NzFormDirective } from 'ng-zorro-antd/form';
import { QlandTableComponent } from '../../../../shared/components/qland-table/qland-table.component';
import { TableColumn } from '../../../../shared/interfaces/qland-table.model';
import { DateConvertorUtil } from '@core/Utils/DateConvertorUtil';

@Component({
  selector: 'admin-vendor-settlement-list',
  imports: [
    FormsModule,
    NzButtonComponent,
    NzFormDirective,
    ReactiveFormsModule,
    QlandTableComponent,
  ],
  providers: [PricePipe],
  templateUrl: './vendor-settlement-list.component.html',
  styleUrl: './vendor-settlement-list.component.scss',
})
export class VendorSettlementListComponent implements OnInit {
  vendorId!: number;
  settlementList!: ISettlementListModel[];
  total = 1;
  pageIndex = 1;
  pageSize = 10;
  sortOrder!: any;
  sortField!: string | undefined;
  loading = false;
  filters: any = {};
  gridOptions!: TableColumn[];
  params: any;

  form: FormGroup = this.fb.group({
    invoiceNumbers: this.fb.array([]),
  });

  constructor(
    private fiscalService: FiscalService,
    private destroyRef: DestroyRef,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    public fb: FormBuilder,
    private router: Router,
    private currencyPipe: PricePipe,
  ) {}

  ngOnInit() {
    this.gridOption();
  }

  getSettlementList(params: HttpParams) {
    this.params = params;
    this.vendorId = this.activatedRoute.snapshot.params['id'];
    this.loading = true;
    return this.fiscalService
      .settlementList(this.vendorId, params)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe((data) => {
        this.total = data.totalCount;
        this.settlementList = data.items.map((item) => ({
          ...item,
          checked: false,
        }));
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
    this.getSettlementList(params);
  }

  gridOption() {
    this.gridOptions = [
      {
        headerName: 'شماره سفارش',
        key: 'invoiceNumber',
      },
      {
        headerName: 'نام خریدار',
        key: 'customerFullName',
      },
      {
        headerName: 'قیمت (ریال)',
        key: 'totalLastAmount',
        valueFormatter: (params) =>
          this.currencyPipe.transform(params.totalLastAmount),
      },
      {
        headerName: 'تاریخ سفارش',
        key: 'createDate',

        valueFormatter: (params) =>
          DateConvertorUtil.toPersianDate(params.createDate),
        sortable: true,
        sortDirections: ['ascend', 'descend'],
      },
      {
        headerName: 'توضیحات',
        key: 'description',
        valueFormatter: (params) =>
          params.description ? `${params.description}` : '-',
      },
    ];
  }

  get invoiceNumbers(): FormArray {
    return this.form.get('invoiceNumbers') as FormArray;
  }

  SettlementUpdate(form: FormGroup) {
    if (this.invoiceNumbers.length === 0) {
      this.toastr.warning('لطفاً یک رکورد را انتخاب کنید');
      return;
    }

    this.fiscalService
      .settle(this.vendorId, form.value)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.toastr.success('اطلاعات با موفقیت انجام شد');

        this.loadData(
          this.filters,
          this.pageSize,
          this.pageIndex,
          this.sortField,
          this.sortOrder,
        );

        setTimeout(() => {
          if (this.settlementList.length === 0) {
            this.router.navigateByUrl('/pages/fiscal/vendors-list');
          }
        }, 500);
      });
  }

  selectedRows(selectedRows: any[]) {
    this.invoiceNumbers.clear();

    selectedRows.forEach((row) => {
      this.invoiceNumbers.push(this.fb.control(row.invoiceNumber));
    });
  }
}
