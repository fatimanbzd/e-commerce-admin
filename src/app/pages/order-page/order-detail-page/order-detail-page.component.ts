import { Component } from '@angular/core';
import { OrderDetailComponent } from '../../../features/order/components/order-detail/order-detail.component';

@Component({
    selector: 'admin-order-detail-page',
    imports: [OrderDetailComponent],
    templateUrl: './order-detail-page.component.html',
    styleUrl: './order-detail-page.component.scss'
})
export class OrderDetailPageComponent {}
