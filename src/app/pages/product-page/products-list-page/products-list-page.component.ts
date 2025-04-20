import { Component } from '@angular/core';
import { ProductsListComponent } from '../../../features/product/components/products-list/products-list.component';

@Component({
    selector: 'admin-products-list-page',
    imports: [ProductsListComponent],
    templateUrl: './products-list-page.component.html',
    styleUrl: './products-list-page.component.scss'
})
export class ProductsListPageComponent {}
