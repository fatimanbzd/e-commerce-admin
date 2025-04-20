import { Component } from '@angular/core';
import { ProductColorListComponent } from './product-color-list/product-color-list.component';

@Component({
    selector: 'admin-product-color',
    imports: [ProductColorListComponent],
    templateUrl: './product-color.component.html',
    styleUrl: './product-color.component.scss'
})
export class ProductColorComponent {}
