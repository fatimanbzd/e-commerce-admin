import { Component, DestroyRef } from '@angular/core';
import { NzAutosizeDirective, NzInputDirective } from 'ng-zorro-antd/input';
import {
  NzButtonComponent,
  NzButtonGroupComponent,
} from 'ng-zorro-antd/button';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import {
  NzFormControlComponent,
  NzFormDirective,
  NzFormItemComponent,
  NzFormLabelComponent,
} from 'ng-zorro-antd/form';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzModalComponent } from 'ng-zorro-antd/modal';
import { NzPopconfirmDirective } from 'ng-zorro-antd/popconfirm';
import { NzRadioComponent, NzRadioGroupComponent } from 'ng-zorro-antd/radio';
import { NzSwitchComponent } from 'ng-zorro-antd/switch';
import {
  NzTabComponent,
  NzTabDirective,
  NzTabPosition,
  NzTabSetComponent,
} from 'ng-zorro-antd/tabs';
import { ProductAddAttachmentComponent } from '../product-add/product-add-attachment/product-add-attachment.component';
import { ProductAddBaseInfoComponent } from '../product-add/product-add-base-info/product-add-base-info.component';
import { ProductAddPriceComponent } from '../product-add/product-add-price/product-add-price.component';
import { ProductAddSeoComponent } from '../product-add/product-add-seo/product-add-seo.component';
import { ProductAddSizeComponent } from '../product-add/product-add-size/product-add-size.component';
import { ProductAddSpecificationComponent } from '../product-add/product-add-specification/product-add-specification.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductInfoBaseComponent } from './product-info-base/product-info-base.component';
import { ProductInfoPriceComponent } from './product-info-price/product-info-price.component';
import { ProductInfoAttachmentComponent } from './product-info-attachment/product-info-attachment.component';
import { ProductInfoSpecificationComponent } from './product-info-specification/product-info-specification.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'admin-product-info',
    imports: [
        NzAutosizeDirective,
        NzButtonComponent,
        NzButtonGroupComponent,
        NzColDirective,
        NzFormControlComponent,
        NzFormDirective,
        NzFormItemComponent,
        NzFormLabelComponent,
        NzIconDirective,
        NzInputDirective,
        NzModalComponent,
        NzPopconfirmDirective,
        NzRadioComponent,
        NzRadioGroupComponent,
        NzRowDirective,
        NzSwitchComponent,
        NzTabComponent,
        NzTabDirective,
        NzTabSetComponent,
        ProductAddAttachmentComponent,
        ProductAddBaseInfoComponent,
        ProductAddPriceComponent,
        ProductAddSeoComponent,
        ProductAddSizeComponent,
        ProductAddSpecificationComponent,
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
