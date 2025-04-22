import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { finalize, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { IVendorResponseModel } from '../../interfaces/vendor-response.model';
import { VendorService } from '../../services/vendor.service';
import { VendorTypeLabel } from '../../../../auth/enums/vendor-type.enum';
import {
  VendorRequestStatusEnum,
  VendorRequestStatusLabel,
} from '../../../../shared/enums/vendor-request-status.enum';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';
import { VendorContractDialogComponent } from '../vendor-contract-dialog/vendor-contract-dialog.component';
import { QlandTableComponent } from '../../../../shared/components/qland-table/qland-table.component';
import { TableColumn } from '../../../../shared/interfaces/qland-table.model';
import { HttpParams } from '@angular/common/http';
import {EnumLabelPipe} from '../../../../shared/pipes/enum-label.pipe';
import {FilterOptionUtils} from '../../../../shared/Utils/filterOption';

@Component({
  selector: 'admin-vendor-list',
  imports: [ReactiveFormsModule, NzModalModule, QlandTableComponent],
  providers: [EnumLabelPipe],
  templateUrl: './vendor-list.component.html',
  styleUrl: './vendor-list.component.scss',
})
export class VendorListComponent implements OnInit, OnDestroy {
  total = 1;
  pageIndex = 1;
  pageSize = 10;
  sortOrder!: any;
  sortField!: string | undefined;
  loading = false;
  filters: any = {};
  gridOptions!: TableColumn[];
  listOfData!: IVendorResponseModel[];

  private _destroy = new Subject<void>();
  @ViewChild('rowSelectionTable') grid: any;

  constructor(
    private vendorService: VendorService,
    private router: Router,
    private modal: NzModalService,
    private toastr: ToastrService,
    private enumLabelPipe: EnumLabelPipe,
  ) {}

  ngOnInit(): void {
    this.gridOption();
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
      case 'show':
        {
          this.navigateToDetail(event.rowData.id);
        }
        break;
      case 'submit':
        {
          this.contractModal(
            event.rowData.id,
            event.rowData.name + '' + event.rowData.family,
          );
        }
        break;
      default:
        return;
    }
  }

  gridOption() {
    this.gridOptions = [
      {
        headerName: 'نام',
        key: 'name',
        valueFormatter: (params) =>
          params.name && params.family
            ? `${params.name} ${params.family}`
            : '-',
      },
      {
        headerName: 'کدملی',
        key: 'nationalNumber',
      },
      {
        headerName: 'موبایل',
        key: 'mobileNumber',
      },

      {
        headerName: 'نوع شرکت',
        key: 'vendorType',
        valueFormatter: (params) =>
          this.enumLabelPipe.transform(params.vendorType, VendorTypeLabel),
      },
      {
        headerName: 'وضعیت',
        key: 'status',
        valueFormatter: (params) =>
          this.enumLabelPipe.transform(params.status, VendorRequestStatusLabel),
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
            {
              label: 'ثبت قرارداد',
              action: 'submit',
              type: 'default',
              isDisabled: (event: IVendorResponseModel) => {
                return (
                  event.status !== VendorRequestStatusEnum.confirmInformation
                );
              },
            },
          ],
          onClick: (event: any) => this.doActionButton(event),
        },
      },
    ];
  }

  getVendors(params: HttpParams) {
    this.loading = true;
    return this.vendorService
      .vendors(params)
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

  contractModal(id: number, name: string) {
    const modalRef = this.modal.create({
      nzTitle: `ثبت قرارداد پذیرنده ${name}`,
      nzData: {
        id: id,
      },
      nzContent: VendorContractDialogComponent,
      nzAfterClose: new EventEmitter<boolean>(),
    });

    modalRef.afterClose.pipe(takeUntil(this._destroy)).subscribe((result) => {
      if (result) this.onAfterClose();
    });
  }

  onAfterClose(): void {
    this.toastr.success('قرارداد با موفقیت ثبت شد.');
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }

  navigateToDetail(id: number) {
    this.router.navigate(['/pages/vendor-management', id]);
  }
}
