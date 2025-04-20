import { TicketPriorityEnum } from '../enums/ticket-priority.enum';

export interface ITicketResponseModel {
  id: number;
  title: string;
  priority: TicketPriorityEnum;
  body: string;
  customerFullName: string;
  createBy: string;
  createDate: string;
}

export interface ITicketItemModel {
  ticketId: number;
  body: string | null;
  createDate: string;
  isSupport: boolean;
  fileId: number | null;
}

export interface ITicketInfoResponseModel {
  ticketId: number;
  title: string;
  priority: number;
  status: number;
  body: string | null;
  fileId: number | null;
  createDate: string;
  customerFullName: string;
  items: ITicketItemModel[];
}

export interface ITicketAddResponseModel {
  id: number;
  fileId: number;
  createDate: string;
}
