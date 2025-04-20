import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  NzTabChangeEvent,
  NzTabComponent,
  NzTabSetComponent,
} from 'ng-zorro-antd/tabs';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { Subject, takeUntil } from 'rxjs';
import { VendorContractComponent } from './vendor-contract/vendor-contract.component';
import { VendorContactInfoComponent } from './vendor-contact-info/vendor-contact-info.component';
import { VendorCompanyInfoComponent } from './vendor-company-info/vendor-company-info.component';
import { VendorAddressInfoComponent } from './vendor-address-info/vendor-address-info.component';
import { VendorAttachmentInfoComponent } from './vendor-attachment-info/vendor-attachment-info.component';
import { VendorFinancialInfoComponent } from './vendor-financial-info/vendor-financial-info.component';
import { VendorService } from '../../services/vendor.service';
import { VendorRealPersonalInfoComponent } from './vendor-real-personal-info/vendor-real-personal-info.component';
import { VendorTypeEnum } from '../../../../auth/enums/vendor-type.enum';
import { IVendorInfoResponseModel } from '../../interfaces/vendor-info-response.model';

@Component({
  selector: 'admin-vendor-profile',
  imports: [
    NzTabComponent,
    NzTabSetComponent,
    VendorContactInfoComponent,
    NzIconDirective,
    VendorCompanyInfoComponent,
    VendorAddressInfoComponent,
    VendorAttachmentInfoComponent,
    VendorFinancialInfoComponent,
    VendorRealPersonalInfoComponent,
    VendorContractComponent,
  ],
  templateUrl: './vendor-profile.component.html',
  styleUrl: './vendor-profile.component.scss',
})
export class VendorProfileComponent implements OnInit, OnDestroy {
  selectedIndex: number | null = 0;
  vendorInfo!: IVendorInfoResponseModel;
  protected readonly VendorTypeEnum = VendorTypeEnum;
  private _destroy = new Subject<void>();

  constructor(private vendorService: VendorService) {}

  changeSelectedTab(tab: NzTabChangeEvent) {
    this.selectedIndex = tab.index as number;
  }

  ngOnInit() {
    this.getVendor();
  }

  getVendor() {
    this.vendorService
      .getVendor()
      .pipe(takeUntil(this._destroy))
      .subscribe((info) => (this.vendorInfo = info));
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
