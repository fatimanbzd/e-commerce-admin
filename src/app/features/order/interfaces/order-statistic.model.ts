import { ReportDatePartEnum } from '../enums/report-date-part-enum';

export interface IAggregateStatisticsOrderResponseModel {
  totalOrders: number;
  averageOrders: number;
  successfulOrders: number;
  unsuccessfulOrders: number;
  valueOfOrders: ValueOfOrders[] | undefined;
}

export interface ValueOfOrders {
  paid: boolean;
  value: number;
  title: string;
}

export interface IOrderStatisticFilterModel {
  datePart: ReportDatePartEnum;
  fromDate: string;
  toDate: string;
}
