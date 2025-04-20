import { Component } from '@angular/core';
import { ProductCategoryListComponent } from '../../../features/admin-base-information/compenents/product-category/product-category-list/product-category-list.component';

@Component({
  selector: 'admin-product-category-page',
  imports: [ProductCategoryListComponent],
  templateUrl: './product-category-page.component.html',
  styleUrl: './product-category-page.component.scss',
})
export class ProductCategoryPageComponent {}
