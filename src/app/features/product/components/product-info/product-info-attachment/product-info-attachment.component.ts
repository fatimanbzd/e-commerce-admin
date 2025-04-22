import {Component, DestroyRef, Input, OnInit} from '@angular/core';
import {ProductAttachmentService} from '../../../services/product-attachment.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {IProductAttachmentResponseModel} from '../../../interfaces/product-attachment.model';
import {FullSrcPipe} from '../../../../../shared/pipes/full-src.pipe';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzEmptyComponent} from 'ng-zorro-antd/empty';

@Component({
    selector: 'admin-product-info-attachment',
  imports: [
    FullSrcPipe,
    NzColDirective,
    NzRowDirective,
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
