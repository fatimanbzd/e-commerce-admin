export enum PublishableStatusesEnum {
  Register = 0,
  Publishable,
  Unpublishable,
}

export const PublishableStatusesLabel: {
  [key in PublishableStatusesEnum]: string;
} = {
  [PublishableStatusesEnum.Register]: 'در حال انتشار',
  [PublishableStatusesEnum.Publishable]: 'منتشر شده',
  [PublishableStatusesEnum.Unpublishable]: 'منتشر نشده',
};
