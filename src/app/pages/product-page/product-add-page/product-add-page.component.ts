import { Component } from '@angular/core';
import { ProductAddComponent } from '../../../features/product/components/product-add/product-add.component';

@Component({
    selector: 'admin-product-item-add-page',
    imports: [ProductAddComponent],
    templateUrl: './product-add-page.component.html',
    styleUrl: './product-add-page.component.scss'
})
export class ProductAddPageComponent {}
