import { Component } from '@angular/core';
import { VendorMessageListComponent } from '../../features/vendor/components/vendor-message/vendor-message-list.component';

@Component({
    selector: 'admin-vendor-message-page',
    imports: [VendorMessageListComponent],
    templateUrl: './vendor-message-page.component.html',
    styleUrl: './vendor-message-page.component.scss'
})
export class VendorMessagePageComponent {}
