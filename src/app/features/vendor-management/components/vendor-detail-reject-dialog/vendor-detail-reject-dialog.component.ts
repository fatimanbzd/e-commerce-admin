import { Component, inject, OnDestroy } from '@angular/core';
import {
  NZ_MODAL_DATA,
  NzModalFooterDirective,
  NzModalRef,
} from 'ng-zorro-antd/modal';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { VendorService } from '../../services/vendor.service';
import { finalize, Subject, takeUntil } from 'rxjs';
import {
  NzFormControlComponent,
  NzFormDirective,
  NzFormItemComponent,
  NzFormLabelComponent,
} from 'ng-zorro-antd/form';
import { NzColDirective } from 'ng-zorro-antd/grid';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'admin-vendor-detail-reject-dialog',
  imports: [
    NzModalFooterDirective,
    NzButtonComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzColDirective,
    NzInputDirective,
    FormsModule,
    NzFormLabelComponent,
    NzFormControlComponent,
  ],
  templateUrl: './vendor-detail-reject-dialog.component.html',
  styleUrl: './vendor-detail-reject-dialog.component.scss',
})
export class VendorDetailRejectDialogComponent implements OnDestroy {
  isConfirmLoading = false;
  description!: string;
  id!: number;
  readonly nzModalData = inject(NZ_MODAL_DATA);
  private _destroy = new Subject<void>();

  constructor(
    private modal: NzModalRef,
    private vendorMngService: VendorService,
    private toastr: ToastrService,
  ) {
    this.id = this.nzModalData.id;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    if (!this.description) {
      this.toastr.error('دلیل رد الزامیست!');
      return;
    }
    this.vendorMngService
      .reject(this.id, this.description)
      .pipe(
        takeUntil(this._destroy),
        finalize(() => (this.isConfirmLoading = false)),
      )
      .subscribe({
        next: () => {
          this.modal.close(true);
        },
      });
  }

  handleCancel(): void {
    this.modal.destroy();
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
