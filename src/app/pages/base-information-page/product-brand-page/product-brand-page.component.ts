import { Component } from '@angular/core';
import { ProductBrandComponent } from '../../../features/admin-base-information/compenents/product-brand/product-brand.component';

@Component({
    selector: 'admin-product-item-brand-page',
    imports: [ProductBrandComponent],
    templateUrl: './product-brand-page.component.html',
    styleUrl: './product-brand-page.component.scss'
})
export class ProductBrandPageComponent {}
