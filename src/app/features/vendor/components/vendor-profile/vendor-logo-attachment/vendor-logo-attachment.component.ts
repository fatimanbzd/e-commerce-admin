import {
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import { NzUploadComponent, NzUploadFile } from 'ng-zorro-antd/upload';
import { ToastrService } from 'ngx-toastr';
import { VendorService } from '../../../services/vendor.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { downloadFileHelper } from '../../../../../shared/Utils/downloadFileHeper';

@Component({
  selector: 'vendor-logo-attachment',
  imports: [
    NzButtonComponent,
    NzIconDirective,
    NzRowDirective,
    NzUploadComponent,
    NzColDirective,
  ],
  templateUrl: './vendor-logo-attachment.component.html',
  styleUrl: './vendor-logo-attachment.component.scss',
})
export class VendorLogoAttachmentComponent {
  fileList: NzUploadFile[] = [];
  uploading = false;
  @Input() logo: string | null = null;
  @Output() updatedLogo = new EventEmitter();

  constructor(
    private toaster: ToastrService,
    private vendorService: VendorService,
    private destroyRef: DestroyRef,
  ) {}

  beforeUpload = (file: NzUploadFile): boolean => {
    const type = file.type as string;
    const str = ['image/jpg', 'image/jpeg', 'image/png'];
    if (str.indexOf(type) < 0) {
      this.toaster.warning('فرمت فایل اشتباه است!');
      return false;
    }
    const isLt3M = (file.size as number) / 1024 / 1024 < 3;
    if (!isLt3M) {
      this.toaster.warning('حجم فایل بیشتر از 3M است!');
      return false;
    }
    this.fileList = this.fileList.concat(file);
    return false;
  };

  customUploadReq() {
    const formData = new FormData();
    this.fileList.forEach((file: any) => {
      formData.append('logo', file);
    });
    this.uploading = true;
    return this.vendorService
      .uploadLogo(formData)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.uploading = false;
          this.fileList = [];
          this.toaster.success('بارگزاری با موفقیت انجام شد.');
          this.updatedLogo.emit();
        },
        error: () => {
          this.uploading = false;
        },
      });
  }

  downloadFile(file: string) {
    downloadFileHelper({ file: file, fileName: 'logo.png' });
  }
}
