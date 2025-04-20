import { Component } from '@angular/core';
import { CustomerDetailComponent } from '../../../features/customer/components/customer-detail/customer-detail.component';

@Component({
    selector: 'admin-customer-detail-page',
    templateUrl: './customer-detail-page.component.html',
    imports: [CustomerDetailComponent],
    styleUrl: './customer-detail-page.component.scss'
})
export class CustomerDetailPageComponent {}
