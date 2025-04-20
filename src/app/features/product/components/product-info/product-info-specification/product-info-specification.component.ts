import { Component, DestroyRef, Input, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { ProductSpecificationService } from '../../../services/product-specification.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IProductSpecificationsResponseModel } from '../../../interfaces/product-specification.model';
import { NgForOf } from '@angular/common';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import {
  NzTableCellDirective,
  NzTableComponent,
  NzTdAddOnComponent,
  NzThMeasureDirective,
  NzTrExpandDirective,
} from 'ng-zorro-antd/table';
import { NzTooltipDirective } from 'ng-zorro-antd/tooltip';
import { NzEmptyComponent } from 'ng-zorro-antd/empty';

@Component({
    selector: 'admin-product-info-specification',
    imports: [
        NgForOf,
        NzDividerComponent,
        NzIconDirective,
        NzTableCellDirective,
        NzTableComponent,
        NzTdAddOnComponent,
        NzThMeasureDirective,
        NzTooltipDirective,
        NzTrExpandDirective,
        NzEmptyComponent,
    ],
    templateUrl: './product-info-specification.component.html',
    styleUrl: './product-info-specification.component.scss'
})
export class ProductInfoSpecificationComponent implements OnInit {
  productSpecs: IProductSpecificationsResponseModel[] = [];
  @Input() productId: number | null = null;

  constructor(
    private productSpecService: ProductSpecificationService,
    private destroyRef: DestroyRef,
  ) {}

  ngOnInit() {
    this.getData(this.productId);
  }

  getData(productId: number | null) {
    if (productId)
      this.productSpecService
        .productSpecs(productId)
        .pipe(
          map((m) => {
            return m.map((s) => ({ ...s, expand: false }));
          }),
          takeUntilDestroyed(this.destroyRef),
        )
        .subscribe((groups) => {
          this.productSpecs = groups;
        });
  }
}
