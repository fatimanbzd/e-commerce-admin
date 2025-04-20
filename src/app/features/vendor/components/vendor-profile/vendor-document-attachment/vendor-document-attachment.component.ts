import { Component, DestroyRef, OnInit } from '@angular/core';
import {
  VendorDocumentTypeEnum,
  VendorDocumentTypeLabel,
} from '../../../enums/vendor-document-type.enum';
import { EnumLabelPipe } from '@core/pipes/enum-label.pipe';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { NzFormControlComponent } from 'ng-zorro-antd/form';
import { VendorService } from '../../../services/vendor.service';
import { ToastrService } from 'ngx-toastr';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IVendorDocumentResponseModel } from '../../../interfaces/vendor-document.model';
import { NzUploadComponent, NzUploadFile } from 'ng-zorro-antd/upload';
import { EnumConvertorUtils } from '@core/Utils/EnumConvertoModel';
import { downloadFileHelper } from '@core/Utils/downloadFileHeper';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzOptionComponent, NzSelectComponent } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'vendor-document-attachment',
  imports: [
    EnumLabelPipe,
    NzButtonComponent,
    NzColDirective,
    NzDividerComponent,
    NzFormControlComponent,
    NzRowDirective,
    NzIconDirective,
    NzUploadComponent,
    NzOptionComponent,
    FormsModule,
    NzSelectComponent,
    NzModalModule,
  ],
  templateUrl: './vendor-document-attachment.component.html',
  styleUrl: './vendor-document-attachment.component.scss',
})
export class VendorDocumentAttachmentComponent implements OnInit {
  documents: IVendorDocumentResponseModel[] = [];
  documentType: number | null = null;
  fileList: NzUploadFile[] = [];
  uploading = false;
  documentTypeList = EnumConvertorUtils.enumToListModel(
    VendorDocumentTypeLabel,
  );
  protected readonly VendorDocumentTypeLabel = VendorDocumentTypeLabel;

  constructor(
    private vendorService: VendorService,
    private toaster: ToastrService,
    private destroyRef: DestroyRef,
    private modal: NzModalService,
    private enumLabelPipe: EnumLabelPipe,
  ) {
    vendorService.documentUpdated$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.getDocuments();
      });
  }

  ngOnInit() {
    this.getDocuments();
  }

  getDocuments() {
    this.vendorService
      .documents()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((documents) => {
        this.documents = documents;
        if (documents?.length > 0) {
          this.updateDocumentTypeList(documents);
        }
      });
  }

  updateDocumentTypeList(documents: IVendorDocumentResponseModel[]) {
    const documentTypes = documents
      .filter((f) => f.documentType !== VendorDocumentTypeEnum.other)
      .map((m) => m.documentType);
    this.documentTypeList = EnumConvertorUtils.enumToListModel(
      VendorDocumentTypeLabel,
    ).filter((x) => !documentTypes.includes(x.value as VendorDocumentTypeEnum));
  }

  downloadFile(fieldId: number) {
    this.vendorService
      .download(fieldId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((file) => {
        downloadFileHelper(file);
      });
  }

  uploadFile() {
    let formData = new FormData();
    formData.set(
      'documentType',
      this.documentType !== null ? this.documentType.toString() : '',
    );
    this.fileList.forEach((file: any) => {
      formData.append('file', file);
    });
    this.uploading = true;
    this.vendorService
      .uploadDocument(formData)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.uploading = false;
          this.fileList = [];
          this.documentType = null;
          this.vendorService.setDocumentUpdated();
          this.toaster.success('تصویر با موفقیت بارگذاری شد');
        },
        error: () => {
          this.uploading = false;
        },
      });
  }

  changeDocument(value: any) {
    this.documentType = value;
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    const type = file.type as string;
    const str = ['application/pdf', 'image/jpg', 'image/jpeg', 'image/png'];
    if (str.indexOf(type) < 0) {
      this.toaster.warning('فرمت فایل اشتباه است!');
      return false;
    }
    const isLt3M = (file.size as number) / 1024 / 1024 < 3;
    if (!isLt3M) {
      this.toaster.warning('حجم فایل بیشتر از 3M است!');
      return false;
    }
    this.fileList = [];
    this.fileList = this.fileList.concat(file);
    return false;
  };

  removeFile(documentId: number, documentType: VendorDocumentTypeEnum) {
    this.modal.confirm({
      nzTitle: `آیا از حذف مدرک "  ${this.enumLabelPipe.transform(
        documentType,
        VendorDocumentTypeLabel,
      )}   " مطمئن هستید؟`,
      nzOkText: 'بله',
      nzCancelText: 'خیر',
      nzOnOk: () => {
        this.vendorService
          .removeDocument(documentId)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe(() => this.vendorService.setDocumentUpdated());
      },
    });
  }
}
