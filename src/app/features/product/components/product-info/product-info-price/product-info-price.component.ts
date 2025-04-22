import { Component, DestroyRef, Input, OnInit } from '@angular/core';
import {
  NzTableComponent,
} from 'ng-zorro-antd/table';
import { empty } from '../../../pipes/empty.pipe';
import { IProductPricesModel } from '../../../interfaces/product-price.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductPriceService } from '../../../services/product-price.service';
import { NzEmptyComponent } from 'ng-zorro-antd/empty';
import {PersianDatePipe} from '../../../../../shared/pipes/persian-date.pipe';
import {PricePipe} from '../../../../../shared/pipes/price.pipe';

@Component({
    selector: 'admin-product-info-price',
    imports: [
        NzTableComponent,
        PersianDatePipe,
        PricePipe,
        empty,

        NzEmptyComponent,
    ],
    templateUrl: './product-info-price.component.html',
    styleUrl: './product-info-price.component.scss'
})
export class ProductInfoPriceComponent implements OnInit {
  productPrices: IProductPricesModel[] = [];

  @Input() productId: number | null = null;

  constructor(
    private productPriceService: ProductPriceService,
    private destroyRef: DestroyRef,
  ) {}

  ngOnInit() {
    this.getData();
  }

  calculateFinalPrice({
    price = 0,
    valueAddedTaxPercent = 0,
    discountPercent = 0,
  }: IProductPricesModel): number {
    const discountAmount = (price * discountPercent) / 100;
    const priceAfterDiscount = price - discountAmount;
    const taxAmount = (priceAfterDiscount * valueAddedTaxPercent) / 100;
    const finalPrice = priceAfterDiscount + taxAmount;
    return parseFloat(finalPrice.toFixed(2));
  }

  getData() {
    if (this.productId)
      this.productPriceService
        .productPrices(this.productId)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((prices) => (this.productPrices = prices));
  }
}
