export enum ReportDatePartEnum {
  monthly = 0,
  daily = 1,
  annually = 2,
  weekly = 3,
}

export const ReportDatePartLabel: Record<ReportDatePartEnum, string> = {
  [ReportDatePartEnum.daily]: 'روزانه',
  [ReportDatePartEnum.monthly]: 'ماهانه',
  [ReportDatePartEnum.weekly]: 'هفتگی',
  [ReportDatePartEnum.annually]: 'سالانه',
};
