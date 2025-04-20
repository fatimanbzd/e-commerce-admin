import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  Injector,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { NzTableModule, NzTableQueryParams } from 'ng-zorro-antd/table';
import { ItemData, TableColumn } from '../../interfaces/qland-table.model';
import { NgClass, NgStyle } from '@angular/common';
import { NzTooltipDirective } from 'ng-zorro-antd/tooltip';
import { QlandTableButtonComponent } from './qland-table-button/qland-table-button.component';
import { FilterGridService } from '../../services/filter-grid.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'admin-qland-table',
  imports: [
    NzTableModule,
    NgStyle,
    NgClass,
    NzTooltipDirective,
    QlandTableButtonComponent,
  ],
  templateUrl: './qland-table.component.html',
  styleUrl: './qland-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class QlandTableComponent {
  private sortConfig: any[] = [];
  private gridFilters: any[] = [];
  allChecked = false;

  @Input() size = 'middle';
  @Input() data: (any | ItemData)[] = [];
  @Input() showPagination = false;
  @Input() totalRecords: number = 0;
  @Input() pageIndex: number | any = 1;
  @Input() pageSize: number | any = 10;
  @Input() tableColumns!: TableColumn[];
  @Input() displayRowIndex: boolean = false;
  @Input() isServerSide: boolean = false;
  @Input() scrollConfig: { x: string; y: string } | any = { x: '1200px' };
  @Input() checkbox: boolean = false;
  @Input() fixedColumn: boolean = false;
  @Input() indeterminate = false;
  @Input() rowStyle: (item: any) => any = () => {};
  @Output() sortChange = new EventEmitter<{
    key: string;
    value: string | null;
  }>();
  @Output() queryParamsChange = new EventEmitter<NzTableQueryParams>();
  @Output() selectedRowsChange = new EventEmitter<any[]>();
  constructor(
    private injector: Injector,
    private filterGridService: FilterGridService,
    private destroyRef: DestroyRef,
  ) {
    filterGridService.getFilterRequestCall$
      .pipe(takeUntilDestroyed(destroyRef))
      .subscribe((filter) => {
        this.gridFilters = filter;
        this.onQueryParamsChange({
          pageSize: 10,
          pageIndex: 1,
          sort: this.sortConfig ?? [],
          filter: filter,
        });
      });
  }

  getRowStyle(item: any) {
    return this.rowStyle ? this.rowStyle(item) : '';
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort, filter } = params;

    const hasPageChanged =
      this.pageSize !== pageSize || this.pageIndex !== pageIndex;
    const hasSortChanged =
      JSON.stringify(this.sortConfig) !== JSON.stringify(sort);
    this.pageSize = pageSize;
    this.pageIndex = pageIndex;
    this.sortConfig = sort;
    params.filter = this.gridFilters;

    if (this.isServerSide) {
      this.queryParamsChange.emit(params);
    }
  }

  getRowIndex(index: number): number {
    return (this.pageIndex - 1) * this.pageSize + index + 1;
  }

  createInjector(item: any): Injector {
    return Injector.create({
      providers: [{ provide: 'item', useValue: item }], // Pass item data
      parent: this.injector,
    });
  }

  checkAll(value: boolean): void {
    this.data.forEach((data) => {
      if (!data.disabled) {
        data.checked = value;
      }
    });
    this.refreshStatus();
  }

  refreshStatus(): void {
    const validData = this.data.filter((value) => !value.disabled);
    const allChecked =
      validData.length > 0 && validData.every((value) => value.checked);
    const allUnChecked = validData.every((value) => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = !allChecked && !allUnChecked;
    const selectedRows = this.data.filter((item) => item.checked);
    this.selectedRowsChange.emit(selectedRows);
  }
}
