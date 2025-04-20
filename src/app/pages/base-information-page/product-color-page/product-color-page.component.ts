import { Component } from '@angular/core';
import { ProductColorComponent } from '../../../features/admin-base-information/compenents/product-color/product-color.component';

@Component({
    selector: 'admin-product-color-page',
    imports: [ProductColorComponent],
    templateUrl: './product-color-page.component.html',
    styleUrl: './product-color-page.component.scss'
})
export class ProductColorPageComponent {}
