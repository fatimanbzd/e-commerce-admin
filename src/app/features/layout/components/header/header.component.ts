import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import {
  NzDropDownDirective,
  NzDropdownMenuComponent,
} from 'ng-zorro-antd/dropdown';
import { NzMenuDirective, NzMenuItemComponent } from 'ng-zorro-antd/menu';
import {
  NzButtonComponent,
  NzButtonGroupComponent,
} from 'ng-zorro-antd/button';
import { AuthService } from '../../../../shared/services/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { VendorAuthService } from '../../../../auth/services/vendor-auth.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import {UserTypeEnum} from '../../../../shared/enums/user-type.enum';

@Component({
  selector: 'admin-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  encapsulation: ViewEncapsulation.None,
  imports: [
    NzIconDirective,
    NzDropdownMenuComponent,
    NzMenuDirective,
    NzMenuItemComponent,
    NzDropDownDirective,
    NzButtonGroupComponent,
    NzButtonComponent,
    RouterLink,
  ],
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentRole!: UserTypeEnum | undefined;
  displayName!: string | undefined;
  notificationCount = 0;
  protected readonly UserTypeEnum = UserTypeEnum;
  private _destroy = new Subject<void>();
  @Input() isCollapsed = false;
  @Output() trigger: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private authService: AuthService,
    private vendorAuthService: VendorAuthService,
    private notificationService: NotificationService,
    private router: Router,
  ) {
    this.currentRole = this.authService.getRole();
    const userInfo = this.authService.getUserAuthenticated();
    if (userInfo?.displayName) this.displayName = userInfo.displayName;
    else {
      authService
        .currentUser()
        .pipe(takeUntil(this._destroy))
        .subscribe((user) => (this.displayName = user.displayName));
    }

    this.notificationService.messageRead$
      .pipe(takeUntil(this._destroy))
      .subscribe(() => this.getNotificationCount());
  }

  ngOnInit() {
    if (this.currentRole == UserTypeEnum.vendor) {
      this.getNotificationCount();
    }
  }

  getNotificationCount() {
    this.vendorAuthService
      .vendorInfo()
      .pipe(takeUntil(this._destroy))
      .subscribe((response) => {
        this.notificationCount = response.numberOfMessages;
        const user = this.authService.getUserAuthenticated();
        user.id = response.vendorId;
        this.authService.setUserAuthenticated(user);
      });
  }

  logout() {
    this.authService.logout();
  }

  headerTrigger() {
    this.isCollapsed = !this.isCollapsed;
    this.trigger.emit(this.isCollapsed);
  }

  changePassword() {
    this.router.navigateByUrl(`/pages/account/change-password`);
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
