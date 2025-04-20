export enum TicketStatusEnum {
  new,
  newQuestion,
  reply,
  closed,
}

export const TicketStatusLabel: Record<TicketStatusEnum, string> = {
  [TicketStatusEnum.new]: 'جدید',
  [TicketStatusEnum.newQuestion]: 'پرسش جدید',
  [TicketStatusEnum.reply]: 'پاسخ داده شده',
  [TicketStatusEnum.closed]: 'بسته',
};
