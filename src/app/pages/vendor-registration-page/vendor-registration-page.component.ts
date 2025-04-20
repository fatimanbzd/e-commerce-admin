import { Component } from '@angular/core';
import { VendorRegistrationComponent } from '../../auth/components/vendor-registration/vendor-registration.component';

@Component({
    selector: 'admin-vendor-registration-page',
    imports: [VendorRegistrationComponent],
    templateUrl: './vendor-registration-page.component.html',
    styleUrl: './vendor-registration-page.component.scss'
})
export class VendorRegistrationPageComponent {}
