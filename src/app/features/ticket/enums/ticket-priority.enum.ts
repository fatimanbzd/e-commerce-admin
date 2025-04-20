export enum TicketPriorityEnum {
  high,
  middle,
  low,
}

export const TicketPriorityLabel: Record<TicketPriorityEnum, string> = {
  [TicketPriorityEnum.high]: 'زیاد',
  [TicketPriorityEnum.middle]: 'متوسط',
  [TicketPriorityEnum.low]: 'کم',
};
