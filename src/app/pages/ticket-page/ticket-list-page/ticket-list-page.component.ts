import { Component } from '@angular/core';
import { TicketListComponent } from '../../../features/ticket/components/ticket-list/ticket-list.component';

@Component({
  selector: 'admin-ticket-list-page',
  imports: [TicketListComponent],
  template: '<admin-ticket-list></admin-ticket-list>',
  styles: '',
})
export class TicketListPageComponent {}
