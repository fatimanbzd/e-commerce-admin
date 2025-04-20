import { Component, OnDestroy } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MobileVerificationComponent } from './mobile-verification/mobile-verification.component';
import { VendorAuthService } from '../../services/vendor-auth.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'vendor-registration',
  imports: [
    MobileVerificationComponent,
    NgOptimizedImage,
    MobileVerificationComponent,
  ],
  templateUrl: './vendor-registration.component.html',
  styleUrl: './vendor-registration.component.scss',
})
export class VendorRegistrationComponent implements OnDestroy {
  mobileNumber!: string;
  private _destroy = new Subject<void>();

  constructor(private authService: VendorAuthService) {
    this.authService.mobileVerified$
      .pipe(takeUntil(this._destroy))
      .subscribe((mobile) => {
        this.mobileNumber = mobile;
      });
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
