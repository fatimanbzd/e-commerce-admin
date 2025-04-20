import { Component, Input, OnDestroy } from '@angular/core';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { VendorService } from '../../../services/vendor.service';

@Component({
    selector: 'vendor-contract',
    imports: [NzButtonComponent],
    templateUrl: './vendor-contract.component.html',
    styleUrl: './vendor-contract.component.scss'
})
export class VendorContractComponent implements OnDestroy {
  @Input() selectedTab!: number;
  private _destroy = new Subject<void>();

  constructor(
    private vendorService: VendorService,
    private toaster: ToastrService,
  ) {}

  saveRequest() {
    this.vendorService
      .addRequest()
      .pipe(takeUntil(this._destroy))
      .subscribe({
        next: () => {
          this.toaster.success('درخواست با موفقیت ارسال شد');
        },
        error: () => {
        },
      });
  }

  cancelRequest() {
    this.vendorService
      .cancelRequest()
      .pipe(takeUntil(this._destroy))
      .subscribe({
        next: () => {
          this.toaster.success('درخواست با موفقیت لغو شد');
        },
        error: () => {
        },
      });
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
