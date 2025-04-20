import { Component, DestroyRef, Input, OnInit } from '@angular/core';
import { ProductAttachmentService } from '../../../services/product-attachment.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IProductAttachmentResponseModel } from '../../../interfaces/product-attachment.model';
import { FullSrcPipe } from '@core/pipes/full-src.pipe';
import { NzAlertComponent } from 'ng-zorro-antd/alert';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import {
  NzFormControlComponent,
  NzFormItemComponent,
  NzFormLabelComponent,
} from 'ng-zorro-antd/form';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzRadioComponent, NzRadioGroupComponent } from 'ng-zorro-antd/radio';
import { NzTooltipDirective } from 'ng-zorro-antd/tooltip';
import { NzEmptyComponent } from 'ng-zorro-antd/empty';

@Component({
    selector: 'admin-product-info-attachment',
    imports: [
        FullSrcPipe,
        NzAlertComponent,
        NzButtonComponent,
        NzColDirective,
        NzFormControlComponent,
        NzFormItemComponent,
        NzFormLabelComponent,
        NzIconDirective,
        NzRadioComponent,
        NzRadioGroupComponent,
        NzRowDirective,
        NzTooltipDirective,
        NzEmptyComponent,
    ],
    templateUrl: './product-info-attachment.component.html',
    styleUrl: './product-info-attachment.component.scss'
})
export class ProductInfoAttachmentComponent implements OnInit {
  images: IProductAttachmentResponseModel[] = [];
  @Input() productId: number | null = null;

  constructor(
    private productAttachmentService: ProductAttachmentService,
    private destroyRef: DestroyRef,
  ) {}

  ngOnInit() {
    this.getImages();
  }

  getImages() {
    if (this.productId)
      this.productAttachmentService
        .images(this.productId)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((images) => {
          this.images = images.filter((x) => x.isPublishable);
        });
  }
}
