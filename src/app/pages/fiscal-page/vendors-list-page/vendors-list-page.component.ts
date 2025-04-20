import { Component } from '@angular/core';
import { VendorsListComponent } from '../../../features/fiscal/components/vendors-list/vendors-list.component';

@Component({
    selector: 'admin-vendors-list-page',
    imports: [VendorsListComponent],
    templateUrl: './vendors-list-page.component.html',
    styleUrl: './vendors-list-page.component.scss'
})
export class VendorsListPageComponent {}
