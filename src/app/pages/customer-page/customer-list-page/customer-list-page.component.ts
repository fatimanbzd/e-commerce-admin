import { Component } from '@angular/core';
import { CustomerListComponent } from '../../../features/customer/components/customer-list/customer-list.component';

@Component({
    selector: 'admin-customer-list-page',
    imports: [CustomerListComponent],
    templateUrl: './customer-list-page.component.html',
    styleUrl: './customer-list-page.component.scss'
})
export class CustomerListPageComponent {}
