export enum CompanyTypeEnum {
  public,
  private,
  limited,
}
export const CompanyTypeLabel: { [key in CompanyTypeEnum]: string } = {
  [CompanyTypeEnum.public]: 'سهامی عام',
  [CompanyTypeEnum.private]: 'سهامی خاص',
  [CompanyTypeEnum.limited]: 'مسئولیت محدود',
};
