import { Component } from '@angular/core';
import { CustomerListComponent } from '../../features/customer/components/customer-list/customer-list.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'admin-customer-page',
    imports: [CustomerListComponent, RouterOutlet],
    templateUrl: './customer-page.component.html',
    styleUrl: './customer-page.component.scss'
})
export class CustomerPageComponent {}
