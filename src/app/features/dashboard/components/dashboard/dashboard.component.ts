import { Component, DestroyRef, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { IDashboardModel } from '../../interfaces/dashboard.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import { PricePipe } from '../../../../shared/pipes/price.pipe';

@Component({
    selector: 'admin-dashboard',
    imports: [NzRowDirective, NzColDirective, PricePipe],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  data!: IDashboardModel;

  constructor(
    private dashboardService: DashboardService,
    private destroyRef: DestroyRef,
  ) {}

  ngOnInit() {
    this.getDataDashboard();
  }

  getDataDashboard() {
    return this.dashboardService
      .getDashboard()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => (this.data = data));
  }
}
