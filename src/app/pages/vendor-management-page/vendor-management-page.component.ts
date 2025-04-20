import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VendorListPageComponent } from './vendor-list-page/vendor-list-page.component';

@Component({
    selector: 'admin-vendor-management-page',
    imports: [VendorListPageComponent, RouterOutlet],
    templateUrl: './vendor-management-page.component.html',
    styleUrl: './vendor-management-page.component.scss'
})
export class VendorManagementPageComponent {}
