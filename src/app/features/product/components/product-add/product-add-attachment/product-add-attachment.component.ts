import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  NzFormControlComponent,
  NzFormItemComponent,
  NzFormLabelComponent,
} from 'ng-zorro-antd/form';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { ProductAttachmentService } from '../../../services/product-attachment.service';
import { NzAlertComponent } from 'ng-zorro-antd/alert';
import { NgStyle } from '@angular/common';
import { FullSrcPipe } from '@core/pipes/full-src.pipe';
import { NzRadioComponent, NzRadioGroupComponent } from 'ng-zorro-antd/radio';
import { IProductAttachmentResponseModel } from '../../../interfaces/product-attachment.model';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTooltipDirective } from 'ng-zorro-antd/tooltip';
import { RoleUtil } from '../../../../../shared/utilities/role-base';

@Component({
  selector: 'admin-product-add-attachment',
  imports: [
    NzAlertComponent,
    ReactiveFormsModule,
    NzColDirective,
    NzFormControlComponent,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzRowDirective,
    NzButtonComponent,
    FullSrcPipe,
    NzRadioComponent,
    NzRadioGroupComponent,
    FormsModule,
    NgStyle,
    NzTooltipDirective,
  ],
  templateUrl: './product-add-attachment.component.html',
  styleUrl: './product-add-attachment.component.scss',
})
export class ProductAddAttachmentComponent
  implements OnChanges, OnInit, OnDestroy
{
  isAdmin = false;
  images: IProductAttachmentResponseModel[] = [];
  editMode: string = 'published';
  currentFile: File | null = null;
  selectedImage: number | null = null;
  loading = false;
  private readonly _destroy = new Subject<void>();

  @Input() productId: number | null = null;
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private fb: NonNullableFormBuilder,
    private toastr: ToastrService,
    private productAttachmentService: ProductAttachmentService,
    private modal: NzModalService,
  ) {
    this.isAdmin = RoleUtil.isAdmin();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['editModeType'].previousValue &&
      changes['editModeType'].previousValue !==
        changes['editModeType'].currentValue
    )
      this.getImages();
  }

  ngOnInit() {
    this.getImages();
  }

  onSelectedIndexImage(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.currentFile = input.files?.item(0);
      this.uploadFile();
    }
  }

  triggerFileInput(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.fileInput.nativeElement.click();
  }

  checkImageValidation() {
    const isJpgOrPng =
      this.currentFile?.type === 'image/jpeg' ||
      this.currentFile?.type === 'image/png';
    if (!isJpgOrPng) {
      this.toastr.error('فرمت فایل اشتباه است!');
      return false;
    }
    const isLt1M = this.currentFile?.size! / 1024 / 1024 < 0.8;
    if (!isLt1M) {
      this.toastr.error('حجم تصویر باید کمتر از 1MB باشد!');
      return false;
    }

    return true;
  }

  getImages() {
    if (this.productId)
      this.productAttachmentService
        .images(this.productId)
        .pipe(takeUntil(this._destroy))
        .subscribe((images) => {
          // const modeType = this.editModeType;
          // if (modeType == 'published')
          //   this.images = images.filter(m => m.isPublishable);
          // else
          this.images = images;
          if (images)
            this.selectedImage =
              images.find((i) => i.isMainImage)?.productImageId ?? null;
        });
  }

  uploadFile() {
    this.checkImageValidation();
    let formData = new FormData();
    formData.append('image', this.currentFile ?? '');
    formData.append('title', '');
    if (this.productId && this.currentFile)
      this.productAttachmentService
        .add(+this.productId, formData)
        .pipe(takeUntil(this._destroy))
        .subscribe({
          next: () => {
            this.toastr.success('تصویر با موفقیت بارگذاری شد');
            this.getImages();
          },
        });
  }

  remove(file: IProductAttachmentResponseModel) {
    if (this.productId)
      this.modal.confirm({
        nzTitle: `آیا از حذف تصویر ${file.productImageId} مطمئن هستید؟`,
        nzOkText: 'بله',
        nzCancelText: 'خیر',
        nzOnOk: () => {
          if (this.productId)
            this.productAttachmentService
              .remove(this.productId, file.productImageId)
              .pipe(takeUntil(this._destroy))
              .subscribe({
                next: () => {
                  this.getImages();
                  this.toastr.success('تصویر با موفقیت حذف شد');
                },
              });
        },
      });
  }

  selectAsIndexImage(imageId: number | null) {
    if (this.productId && imageId)
      this.productAttachmentService
        .setAsDefault(this.productId, imageId)
        .subscribe({
          next: () =>
            this.toastr.success(
              `تصویر ${imageId} به عنوان تصویر اصلی انتخاب شد.`,
            ),
        });
  }

  publish(file: IProductAttachmentResponseModel) {
    if (this.productId)
      this.modal.confirm({
        nzTitle: `آیا از از انتشار تصویر "${file.title} " مطمئن هستید؟`,
        nzOkText: 'بله',
        nzCancelText: 'خیر',
        nzOnOk: () => {
          if (this.productId)
            this.productAttachmentService
              .publish(this.productId, file.productImageId)
              .pipe(takeUntil(this._destroy))
              .subscribe({
                next: () => {
                  this.getImages();
                  this.toastr.success('تصویر با موفقیت منتشر شد');
                },
              });
        },
      });
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
