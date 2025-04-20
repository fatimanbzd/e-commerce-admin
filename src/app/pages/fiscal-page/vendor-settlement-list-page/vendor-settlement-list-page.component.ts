import { Component } from '@angular/core';
import { VendorSettlementListComponent } from '../../../features/fiscal/components/vendor-settlement-list/vendor-settlement-list.component';

@Component({
    selector: 'admin-vendor-settlement-list-page',
    imports: [VendorSettlementListComponent],
    templateUrl: './vendor-settlement-list-page.component.html',
    styleUrl: './vendor-settlement-list-page.component.scss'
})
export class VendorSettlementListPageComponent {}
