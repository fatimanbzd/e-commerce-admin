import { Component } from '@angular/core';
import { ProductInfoComponent } from '../../../features/product/components/product-info/product-info.component';

@Component({
    selector: 'admin-product-info-page',
    imports: [ProductInfoComponent],
    template: `<admin-product-info></admin-product-info>`,
    styles: []
})
export class ProductInfoPageComponent {}
