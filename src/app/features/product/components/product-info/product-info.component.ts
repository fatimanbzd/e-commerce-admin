import {Component, DestroyRef} from '@angular/core';
import {NzTabComponent, NzTabDirective, NzTabPosition, NzTabSetComponent,} from 'ng-zorro-antd/tabs';
import {ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ProductInfoBaseComponent} from './product-info-base/product-info-base.component';
import {ProductInfoPriceComponent} from './product-info-price/product-info-price.component';
import {ProductInfoAttachmentComponent} from './product-info-attachment/product-info-attachment.component';
import {ProductInfoSpecificationComponent} from './product-info-specification/product-info-specification.component';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
    selector: 'admin-product-info',
  imports: [
    NzTabComponent,
    NzTabDirective,
    NzTabSetComponent,
    ReactiveFormsModule,
    ProductInfoBaseComponent,
    ProductInfoPriceComponent,
    ProductInfoAttachmentComponent,
    ProductInfoSpecificationComponent,
  ],
    templateUrl: './product-info.component.html',
    styleUrl: './product-info.component.scss'
})
export class ProductInfoComponent {
  selectedIndex = 0;
  nzTabPosition: NzTabPosition = 'right';
  productId!: number;

  constructor(
    private activateRoute: ActivatedRoute,
    private destroyRef: DestroyRef,
  ) {
    activateRoute.params
      .pipe(takeUntilDestroyed(destroyRef))
      .subscribe((params) => (this.productId = +params['id']));
  }
}
