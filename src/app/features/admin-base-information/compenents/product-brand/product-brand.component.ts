import { Component } from '@angular/core';
import { ProductBrandListComponent } from './product-brand-list/product-brand-list.component';

@Component({
  selector: 'admin-product-brand',
  imports: [ProductBrandListComponent],
  templateUrl: './product-brand.component.html',
  styleUrl: './product-brand.component.scss',
})
export class ProductBrandComponent {}
