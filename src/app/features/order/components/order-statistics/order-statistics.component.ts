import { Component } from '@angular/core';
import {
  NzTabChangeEvent,
  NzTabComponent,
  NzTabSetComponent,
} from 'ng-zorro-antd/tabs';
import { HighchartsChartModule } from 'highcharts-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderStatisticValueComponent } from './order-statistic-value/order-statistic-value.component';
import { OrderStatisticOrderCountComponent } from './order-statistic-order-count/order-statistic-order-count.component';
import { OrderStatisticUserCountComponent } from './order-statistic-user-count/order-statistic-user-count.component';
import { OrderStatisticProductCountComponent } from './order-statistic-product-count/order-statistic-product-count.component';

@Component({
  selector: 'admin-order-statistics',
  imports: [
    NzTabSetComponent,
    NzTabComponent,
    HighchartsChartModule,
    FormsModule,
    ReactiveFormsModule,
    OrderStatisticValueComponent,
    OrderStatisticOrderCountComponent,
    OrderStatisticUserCountComponent,
    OrderStatisticProductCountComponent,
  ],

  templateUrl: './order-statistics.component.html',
  styleUrl: './order-statistics.component.scss',
})
export class OrderStatisticsComponent {
  selectedIndex: number = 0;

  changeSelectedTab(tab: NzTabChangeEvent) {
    this.selectedIndex = tab.index as number;
  }
}
