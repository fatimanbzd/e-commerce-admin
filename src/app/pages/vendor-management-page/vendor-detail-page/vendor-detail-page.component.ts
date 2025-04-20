import { Component } from '@angular/core';
import { VendorDetailComponent } from '../../../features/vendor-management/components/vendor-detail/vendor-detail.component';

@Component({
    selector: 'admin-vendor-detail-page',
    imports: [VendorDetailComponent],
    templateUrl: './vendor-detail-page.component.html',
    styleUrl: './vendor-detail-page.component.scss'
})
export class VendorDetailPageComponent {}
