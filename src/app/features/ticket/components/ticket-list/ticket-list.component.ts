import { Component, DestroyRef, OnInit } from '@angular/core';
import { QlandTableComponent } from '../../../../shared/components/qland-table/qland-table.component';
import { IUserModel } from '@core/interfaces/user.model';
import { TableColumn } from '../../../../shared/interfaces/qland-table.model';
import { finalize } from 'rxjs';
import { ITicketResponseModel } from '../../interfaces/ticket.model';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { HttpParams } from '@angular/common/http';
import { FilterOptionUtils } from '@core/Utils/filterOption';
import { Router } from '@angular/router';
import { TicketService } from '../../services/ticket.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NzModalService } from 'ng-zorro-antd/modal';
import { EnumLabelPipe } from '@core/pipes/enum-label.pipe';
import { TicketPriorityLabel } from '../../enums/ticket-priority.enum';
import { ToastrService } from 'ngx-toastr';
import { TicketStatusLabel } from '../../enums/ticket-status.enum';

@Component({
  selector: 'admin-ticket-list',
  imports: [QlandTableComponent],
  providers: [NzModalService, EnumLabelPipe],
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.scss',
})
export class TicketListComponent implements OnInit {
  user!: IUserModel;
  total = 1;
  pageIndex = 1;
  pageSize = 10;
  sortOrder!: any;
  sortField!: string | undefined;
  loading = false;
  listOfData!: ITicketResponseModel[];
  gridOptions!: TableColumn[];

  constructor(
    private ticketService: TicketService,
    private router: Router,
    private destroyRef: DestroyRef,
    private modal: NzModalService,
    private toastr: ToastrService,
    private enumLabel: EnumLabelPipe,
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
    this.loadData(filter, pageSize, pageIndex, sortField, sortOrder);
  }

  getTickets(params: HttpParams) {
    this.loading = true;
    return this.ticketService
      .tickets(params)
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
    this.getTickets(params);
  }

  private doActionButton(event: any) {
    switch (event.action) {
      case 'show':
        {
          this.router.navigate(['/pages/ticket', event.rowData.ticketId]);
        }
        break;
      case 'remove':
        this.removeTicket(event.rowData.title, event.rowData.ticketId);
        break;
      default:
        return;
    }
  }

  private removeTicket(title: string, id: number) {
    this.modal.confirm({
      nzTitle: `آیا از از حدف "${title} " مطمئن هستید؟`,
      nzOkText: 'بله',
      nzCancelText: 'خیر',
      nzOnOk: () => {
        this.ticketService
          .remove(id)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: () => {
              this.toastr.success('تیکت با موفقیت حذف شد');
            },
          });
      },
    });
  }

  private gridOption() {
    this.gridOptions = [
      {
        headerName: 'موضوع',
        key: 'title',
      },
      {
        headerName: 'کاربر مربوطه',
        key: 'customerFullName',
      },
      {
        headerName: 'الویت',
        key: 'priority',
        valueFormatter: (params) =>
          this.enumLabel.transform(params?.priority, TicketPriorityLabel),
        sortable: true,
        sortDirections: ['ascend', 'descend'],
      },
      {
        headerName: 'وضعیت',
        key: 'status',
        valueFormatter: (params) =>
          this.enumLabel.transform(params?.status, TicketStatusLabel),
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
              type: 'primary',
              colorBtn: 'blue',
            },
            {
              label: 'حذف',
              action: 'remove',
              type: 'default',
            },
          ],
          onClick: (event: any) => this.doActionButton(event),
        },
      },
    ];
  }
}
