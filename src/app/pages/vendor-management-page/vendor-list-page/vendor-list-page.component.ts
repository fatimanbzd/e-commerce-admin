import { Component } from '@angular/core';
import { VendorListComponent } from '../../../features/vendor-management/components/vendor-list/vendor-list.component';

@Component({
    selector: 'admin-vendor-list-page',
    imports: [VendorListComponent],
    templateUrl: './vendor-list-page.component.html',
    styleUrl: './vendor-list-page.component.scss'
})
export class VendorListPageComponent {}
