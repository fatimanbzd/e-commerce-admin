import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { VendorService } from '../../../services/vendor.service';
import { ToastrService } from 'ngx-toastr';
import {
  NzUploadComponent,
  NzUploadFile,
  NzUploadXHRArgs,
} from 'ng-zorro-antd/upload';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import { NzIconDirective } from 'ng-zorro-antd/icon';

@Component({
  selector: 'vendor-official-news-document',
  imports: [
    NzButtonComponent,
    NzColDirective,
    NzIconDirective,
    NzRowDirective,
    NzUploadComponent,
  ],
  templateUrl: './vendor-official-news-document.component.html',
  styleUrl: './vendor-official-news-document.component.scss',
})
export class VendorOfficialNewsDocumentComponent
  implements OnChanges, OnDestroy
{
  officialNewspaperAttachmentId!: number | null;
  fileList: NzUploadFile[] = [];
  private _destroy = new Subject<void>();

  @Input() officialAttachmentId!: number | null;
  @Output() download = new EventEmitter();

  constructor(
    private vendorService: VendorService,
    private toaster: ToastrService,
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['officialAttachmentId'] &&
      changes['officialAttachmentId'].currentValue
    ) {
      this.officialNewspaperAttachmentId =
        changes['officialAttachmentId'].currentValue;
    }
  }

  downloadFile(fieldId: number) {
    this.download.emit(fieldId);
  }

  base64Request = (args: NzUploadXHRArgs) => {
    return new Observable((subscriber) => {
      const reader = new FileReader();
      reader.readAsDataURL(args.file as any);
      reader.onload = (e) => {
        subscriber.next(e.target?.result as string);
      };
    })
      .pipe(takeUntil(this._destroy))
      .subscribe((res) => {
        args.onSuccess!(
          {
            url: res,
          },
          args.file,
          null,
        );

        this.uploadFile(args.file);
      });
  };

  beforeUpload = (file: NzUploadFile): boolean => {
    if (this.fileList.length > 0) return false;
    const isLt1M = file.size! / 1024 / 1024 < 0.8;
    if (!isLt1M) {
      this.toaster.error('سایز تصویر باید کمتر از 1MB باشد!');
      return false;
    }
    return true;
  };

  uploadFile(file: any) {
    let formData = new FormData();
    formData.set('officialNewspaperDocumentFile', file);

    this.vendorService
      .updateOfficialNewsPagerDocument(formData)
      .pipe(takeUntil(this._destroy))
      .subscribe({
        next: (id) => {
          this.officialNewspaperAttachmentId = id;
          this.vendorService.setDocumentUpdated();
          this.toaster.success('تصویر با موفقیت بارگذاری شد');
        },
      });
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
