import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { VendorService } from '../../services/vendor.service';
import { IVendorDetailModel } from '../../interfaces/vendor-detail.model';
import {
  VendorTypeEnum,
  VendorTypeLabel,
} from '../../../../auth/enums/vendor-type.enum';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzTableComponent } from 'ng-zorro-antd/table';
import {
  NzButtonComponent,
  NzButtonGroupComponent,
} from 'ng-zorro-antd/button';
import {
  VendorRequestStatusEnum,
  VendorRequestStatusLabel,
} from '../../../../shared/enums/vendor-request-status.enum';
import { NzPageHeaderComponent } from 'ng-zorro-antd/page-header';
import { ToastrService } from 'ngx-toastr';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { VendorDetailRejectDialogComponent } from '../vendor-detail-reject-dialog/vendor-detail-reject-dialog.component';
import { VendorDocumentTypeLabel } from '../../enums/vendor-document-type.enum';
import { NzPopconfirmDirective } from 'ng-zorro-antd/popconfirm';
import {PersianDatePipe} from '../../../../shared/pipes/persian-date.pipe';
import {EnumLabelPipe} from '../../../../shared/pipes/enum-label.pipe';

@Component({
  selector: 'admin-vendor-detail',
  imports: [
    PersianDatePipe,
    EnumLabelPipe,
    NzIconDirective,
    NzTableComponent,
    NzButtonComponent,
    NzPageHeaderComponent,
    NzModalModule,
    NzButtonGroupComponent,
    NzPopconfirmDirective,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './vendor-detail.component.html',
  styleUrl: './vendor-detail.component.scss',
})
export class VendorDetailComponent implements OnInit, OnDestroy {
  vendor!: IVendorDetailModel;

  protected readonly VendorTypeLabel = VendorTypeLabel;
  protected readonly VendorTypeEnum = VendorTypeEnum;
  protected readonly VendorRequestStatusLabel = VendorRequestStatusLabel;
  private id!: number;
  private _destroy = new Subject<void>();
  protected readonly VendorRequestStatusEnum = VendorRequestStatusEnum;

  protected readonly vendorDocumentTypeLabel = VendorDocumentTypeLabel;

  constructor(
    private activatedRoute: ActivatedRoute,
    private vendorMngService: VendorService,
    private modal: NzModalService,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.vendorMngService
      .vendor(this.id)
      .pipe(takeUntil(this._destroy))
      .subscribe((vendor) => (this.vendor = vendor));
  }

  download(fieldId: number) {
    this.vendorMngService
      .download(fieldId)
      .pipe(takeUntil(this._destroy))
      .subscribe((file) => {
        const source = `data:application/pdf;base64,${file.file}`;
        const link = document.createElement('a');
        link.href = source;
        link.download = file.fileName;
        link.click();
      });
  }

  approve(id: number) {
    this.vendorMngService
      .accept(id)
      .pipe(takeUntil(this._destroy))
      .subscribe({
        next: () => {
          this.toastr.success('درخواست موردنظر تایید شد');
          this.router.navigateByUrl('/pages/vendor-management/vendor-list');
        },
      });
  }

  reject(id: number) {
    const modalRef = this.modal.create({
      nzTitle: `رد درخواست پذیرنده ${name}`,
      nzData: {
        id: id,
      },
      nzContent: VendorDetailRejectDialogComponent,
      nzAfterClose: new EventEmitter<boolean>(),
    });
    modalRef.afterClose.pipe(takeUntil(this._destroy)).subscribe((result) => {
      if (result) this.onAfterClose();
    });
  }

  onAfterClose(): void {
    this.toastr.success('درخواست با موفقیت رد شد.');
    this.router.navigateByUrl('/pages/vendor-management/vendor-list');
  }

  onBack() {
    this.router.navigateByUrl('/pages/vendor-management/vendor-list');
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
