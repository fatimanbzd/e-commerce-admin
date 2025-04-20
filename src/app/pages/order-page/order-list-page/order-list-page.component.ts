import { Component } from '@angular/core';
import { OrderListComponent } from '../../../features/order/components/order-list/order-list.component';

@Component({
    selector: 'admin-order-list-page',
    imports: [OrderListComponent],
    templateUrl: './order-list-page.component.html',
    styleUrl: './order-list-page.component.scss'
})
export class OrderListPageComponent {}
