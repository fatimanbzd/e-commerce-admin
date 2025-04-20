import { Component } from '@angular/core';
import { ProductAddComponent } from '../../features/product/components/product-add/product-add.component';
import { ProductsListComponent } from '../../features/product/components/products-list/products-list.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'admin-product-item-page',
    imports: [ProductAddComponent, ProductsListComponent, RouterOutlet],
    templateUrl: './product-page.component.html',
    styleUrl: './product-page.component.scss'
})
export class ProductPageComponent {}
