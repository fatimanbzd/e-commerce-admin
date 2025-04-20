import { Component, DestroyRef } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import { NzEmptyComponent } from 'ng-zorro-antd/empty';
import { OrderStatisticFilterComponent } from '../order-statistic-filter/order-statistic-filter.component';
import { NzStatisticComponent } from 'ng-zorro-antd/statistic';
import {
  IAggregateStatisticsOrderResponseModel,
  IOrderStatisticFilterModel,
} from '../../../interfaces/order-statistic.model';
import { OrderService } from '../../../services/order.service';
import Highcharts from 'highcharts';
import {
  catchError,
  filter,
  from,
  groupBy,
  map,
  mergeMap,
  of,
  reduce,
  toArray,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'admin-order-statistic-user-count',
  imports: [
    DecimalPipe,
    HighchartsChartModule,
    NzCardComponent,
    NzColDirective,
    NzEmptyComponent,
    OrderStatisticFilterComponent,
    NzRowDirective,
    NzStatisticComponent,
  ],
  templateUrl: './order-statistic-user-count.component.html',
  styleUrl: './order-statistic-user-count.component.scss',
})
export class OrderStatisticUserCountComponent {
  protected readonly Highcharts = Highcharts;
  filter: Partial<IOrderStatisticFilterModel> = { datePart: 0 };
  totalAmounts!: IAggregateStatisticsOrderResponseModel;
  chartOptions: Highcharts.Options = {
    chart: [
      {
        type: 'column',
      },
    ],
  };

  constructor(
    private orderService: OrderService,
    private destroyRef: DestroyRef,
  ) {}

  userCountPerDate(filterModel: Partial<IOrderStatisticFilterModel> | null) {
    this.orderService
      .aggregateStatisticsCustomerCount(filterModel)
      .pipe(
        mergeMap((values) => {
          this.totalAmounts = values;
          if (values.valueOfOrders) return from(values.valueOfOrders);
          else return of(null);
        }),
        filter((order: any) => order.valueOfOrders !== null),
        groupBy((order) => order.title),
        mergeMap((group$) =>
          group$.pipe(
            reduce(
              (acc, item: any) => {
                const paidKey = item.paid ? 'true' : 'false';
                acc[paidKey] += item.value;
                return acc;
              },
              { true: 0, false: 0 },
            ),
            map((groupData) => ({
              title: group$.key,
              ...groupData,
            })),
          ),
        ),
        toArray(),
        catchError(() => {
          return of([]);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((groupData) => {
        const chart = {
          categories: groupData.map((group) => group.title),
          paidSeries: groupData.map((group) => group.true),
          unpaidSeries: groupData.map((group) => group.false),
        };

        if (chart) this.renderChart(chart);
        else this.getEmptyChartOptions();
      });
  }

  renderChart(data: any) {
    this.chartOptions = {
      title: {
        text: '',
      },
      xAxis: { categories: data.categories },
      yAxis: {
        allowDecimals: true,
        softMin: 0,
        title: {
          text: '',
        },
        labels: {
          align: 'right',
          useHTML: true,
          formatter: function () {
            const formattedValue = new Intl.NumberFormat('fa-IR').format(
              this.value as number,
            );
            return `<div class="rtl text-start "> ${formattedValue}
                    </div>`;
          },
        },
      },
      plotOptions: {
        column: {
          stacking: 'normal',
        },
      },
      tooltip: {
        useHTML: true,
        formatter: function () {
          const formattedValue = new Intl.NumberFormat('fa-IR').format(
            this.y as number,
          );

          return `<div style="width: 200px;" class="rtl text-start">
                    <span style="color: ${this.color}">●</span>
                    <strong>تاریخ: </strong>
                    <b class="ltr" > \u200E${this.x} </b>
                    <br/>
                <strong>${this.series.name} :  </strongg>
               <b> ${formattedValue} <b>
               </div>`;
        },
        positioner: function (labelWidth, labelHeight, point) {
          return {
            x: point.plotX + 20,
            y: point.plotY - 30,
          };
        },
      },
      series: [
        {
          name: 'تعداد کاربران سفارش پرداخت شده',
          data: data.paidSeries,
          colorIndex: 2,
          type: 'column',
          color: '#9fe5b2',
        },
        {
          name: 'تعداد کاربران سفارش پرداخت نشده',
          data: data.unpaidSeries,
          colorIndex: 1,
          type: 'column',
          color: '#e97f7f',
        },
      ],
    };
  }

  getEmptyChartOptions(): Highcharts.Options {
    return {
      chart: {
        type: 'column',
      },
      title: {
        text: '',
        align: 'center',
        verticalAlign: 'middle',
        style: {
          fontSize: '16px',
          color: '#666',
        },
      },
      xAxis: {
        visible: false,
      },
      yAxis: {
        visible: false,
      },
      series: [],
    };
  }
}
