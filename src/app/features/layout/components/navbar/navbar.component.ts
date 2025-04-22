import { Component, Input } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconDirective, NzIconModule } from 'ng-zorro-antd/icon';
import {
  NzMenuDirective,
  NzMenuItemComponent,
  NzSubMenuComponent,
} from 'ng-zorro-antd/menu';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { IMenuModel } from '../../interfaces/menu.model';
import { NgIf } from '@angular/common';
import { AuthService } from '../../../../shared/services/auth.service';
import { UserTypeEnum } from '../../../../shared/enums/user-type.enum';
import { filter, map } from 'rxjs';

@Component({
  selector: 'admin-navbar',
  imports: [
    NzLayoutModule,
    NzIconDirective,
    NzIconModule,
    NzMenuDirective,
    NzMenuItemComponent,
    NzSubMenuComponent,
    RouterLink,
    NgIf,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @Input() isCollapsed = false;
  public menuList!: IMenuModel[];
  currentRoute: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    const currentRole = this.authService.getRole();

    router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map((event: NavigationEnd) => event.url),
      )
      .subscribe((url) => {
        this.currentRoute = url;
        this.constructMenu(currentRole);
      });
  }

  constructMenu(currentRole: UserTypeEnum | undefined) {
    this.menuList = [
      {
        label: 'داشبورد',
        icon: 'dashboard',
        permission: true,
        route: '/pages/dashboard',
        selected: this.currentRoute === '/pages/dashboard',
        isOpen: false,
      },

      {
        label: 'مدیریت',
        icon: 'user',
        permission: currentRole === UserTypeEnum.admin,
        route: '/pages/management',
        isOpen: this.currentRoute.includes('/pages/management'),
        children: [
          {
            label: 'نظرات',
            route: '/pages/management/comments-list',
            permission: true,
          },
        ],
      },

      {
        label: 'پروفایل',
        icon: 'user',
        permission: currentRole === UserTypeEnum.vendor,
        route: '/pages/vendor',
        isOpen: this.currentRoute.includes('/pages/vendor'),
        children: [
          {
            label: 'اطلاعات پذیرنده',
            route: '/pages/vendor/profile',
            permission: true,
          },
          {
            label: 'پیام ها',
            route: '/pages/vendor/vendor-messages',
            permission: true,
          },
          {
            label: 'تغییر رمز عبور',
            route: '/pages/vendor/change-password',
            permission: true,
          },
        ],
      },
      {
        label: 'کاربران',
        icon: 'team',
        permission: currentRole === UserTypeEnum.admin,
        route: '/pages/vendor-management',
        isOpen:
          this.currentRoute.includes('/pages/vendor-management') ||
          this.currentRoute.includes('/pages/user'),
        children: [
          {
            label: 'لیست مشتریان',
            route: '/pages/user/list',
            permission: true,
          },
          {
            label: 'لیست پذیرندگان',
            route: '/pages/vendor-management/vendor-list',
            permission: true,
          },
        ],
      },
      {
        label: 'اطلاعات پایه',
        icon: 'info-circle',
        permission: currentRole === UserTypeEnum.admin,
        route: '/pages/base-info',
        isOpen: this.currentRoute.includes('/pages/base-info'),
        children: [
          {
            label: 'دسته بندی محصولات',
            route: '/pages/base-info/product-item-category',
            permission: true,
          },
          {
            label: 'رنگ محصولات',
            route: '/pages/base-info/product-item-color',
            permission: true,
          },
          {
            label: 'برند محصولات',
            route: '/pages/base-info/product-item-brand',
            permission: true,
          },
        ],
      },
      {
        label: 'محصولات',
        icon: 'tags',
        permission: true,
        route: '/pages/product',
        isOpen: this.currentRoute.includes('/pages/product'),
        children: [
          {
            label: 'ایجاد محصول',
            route: '/pages/product/add',
            permission: currentRole === UserTypeEnum.vendor,
          },
          {
            label: 'لیست محصولات',
            route: '/pages/product/list',
            permission: true,
          },
        ],
      },
      {
        label: 'سفارشات',
        icon: 'shopping-cart',
        permission: true,
        route: '/pages/order',
        isOpen: this.currentRoute.includes('/pages/order'),
        children: [
          {
            label: 'لیست سفارشات',
            route: '/pages/order/list',
            permission: true,
          },
        ],
      },

      {
        label: 'مالی',
        icon: 'solution',
        permission: currentRole === UserTypeEnum.admin,
        route: '/pages/fiscal',
        isOpen: this.currentRoute.includes('/pages/fiscal'),
        children: [
          {
            label: 'تسویه',
            route: '/pages/fiscal/vendors-list',
            permission: true,
          },

          {
            label: 'تراکنش ها',
            route: '/pages/fiscal/settlement-reports-list',
            permission: true,
          },
        ],
      },

      {
        label: 'مالی',
        icon: 'solution',
        permission: currentRole === UserTypeEnum.vendor,
        route: '/pages/fiscal-vendor',
        isOpen: this.currentRoute.includes('/pages/fiscal-vendor'),
        children: [
          {
            label: 'تراکنش ها',
            route: '/pages/fiscal-vendor/settlement-reports-list',
            permission: true,
          },
        ],
      },

      {
        label: 'پرداخت',
        icon: 'credit-card',
        permission: currentRole === UserTypeEnum.admin,
        route: '/pages/fiscal-vendor',
        isOpen: this.currentRoute.includes('/pages/payment'),
        children: [
          {
            label: 'صورتحساب سفارشات',
            route: '/pages/payment/billing-information',
            permission: true,
          },
        ],
      },

      {
        label: 'گزارشات',
        icon: 'pie-chart',
        permission: currentRole === UserTypeEnum.admin,
        route: '/pages/statistics',
        isOpen: this.currentRoute.includes('/pages/statistics'),
        children: [
          {
            label: 'سفارشات',
            route: '/pages/statistics/orders',
            permission: currentRole === UserTypeEnum.admin,
          },
        ],
      },

      {
        label: 'تیکت ها',
        icon: 'pie-chart',
        permission: currentRole === UserTypeEnum.admin,
        route: '/pages/ticket',
        isOpen: this.currentRoute.includes('/pages/ticket'),
        children: [
          {
            label: 'لیست تیکت ها',
            route: '/pages/ticket/list',
            permission: true,
          },
        ],
      },
    ];
  }
}
