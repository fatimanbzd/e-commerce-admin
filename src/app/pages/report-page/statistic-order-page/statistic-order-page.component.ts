import { Component } from '@angular/core';
import { OrderStatisticsComponent } from '../../../features/order/components/order-statistics/order-statistics.component';

@Component({
  selector: 'admin-statistic-order-page',
  imports: [OrderStatisticsComponent],
  templateUrl: './statistic-order-page.component.html',
  styleUrl: './statistic-order-page.component.scss',
})
export class StatisticOrderPageComponent {}
