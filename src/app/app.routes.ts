import {Routes} from '@angular/router';
import {AuthGuard} from './auth/gaurds/auth.guard';
import {NoAuthGuardGuard} from './auth/gaurds/no-auth-guard.guard';
import {AdminGuard} from './auth/gaurds/admin.guard';
import {ChangedPasswordGuard} from './auth/gaurds/changed-password.guard';
import {UserTypeEnum} from './shared/enums/user-type.enum';
import {TicketListPageComponent} from './pages/ticket-page/ticket-list-page/ticket-list-page.component';
import {TicketInfoPageComponent} from './pages/ticket-page/ticket-info-page/ticket-info-page.component';
import {StatisticOrderPageComponent} from './pages/report-page/statistic-order-page/statistic-order-page.component';
import {
  BillingInformationPageComponent
} from './pages/payment-page/billing-information-page/billing-information-page.component';
import {DashboardPageComponent} from './pages/dashboard-page/dashboard-page.component';
import {CustomerListPageComponent} from './pages/customer-page/customer-list-page/customer-list-page.component';
import {CustomerDetailPageComponent} from './pages/customer-page/customer-detail-page/customer-detail-page.component';
import {VendorMessagePageComponent} from './pages/vendor-message-page/vendor-message-page.component';
import {ChangePasswordPageComponent} from './pages/account-page/change-password-page/change-password-page.component';
import {VendorListPageComponent} from './pages/vendor-management-page/vendor-list-page/vendor-list-page.component';
import {
  VendorDetailPageComponent
} from './pages/vendor-management-page/vendor-detail-page/vendor-detail-page.component';
import {
  ProductCategoryPageComponent
} from './pages/base-information-page/product-category-page/product-category-page.component';
import {ProductColorPageComponent} from './pages/base-information-page/product-color-page/product-color-page.component';
import {ProductBrandPageComponent} from './pages/base-information-page/product-brand-page/product-brand-page.component';
import {VendorsListPageComponent} from './pages/fiscal-page/vendors-list-page/vendors-list-page.component';
import {VendorProfilePageComponent} from './pages/vendor-profile-page/vendor-profile-page.component';
import {
  SettlementReportsListPageComponent
} from './pages/fiscal-page/settlement-reports-list-page/settlement-reports-list-page.component';
import {
  VendorSettlementListPageComponent
} from './pages/fiscal-page/vendor-settlement-list-page/vendor-settlement-list-page.component';
import {ProductAddPageComponent} from './pages/product-page/product-add-page/product-add-page.component';
import {ProductsListPageComponent} from './pages/product-page/products-list-page/products-list-page.component';
import {ProductInfoPageComponent} from './pages/product-page/product-info-page/product-info-page.component';
import {OrderListPageComponent} from './pages/order-page/order-list-page/order-list-page.component';
import {OrderDetailPageComponent} from './pages/order-page/order-detail-page/order-detail-page.component';
import {
  ManagementCommentsListPageComponent
} from './pages/management-page/management-comments-list-page/management-comments-list-page.component';
import {NotFoundComponent} from './shared/components/not-found/not-found.component';

export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'pages'},
  {
    path: 'pages',
    loadComponent: () =>
      import('./pages/pages.component').then((m) => m.PagesComponent),
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },

      {
        path: 'dashboard',
        component: DashboardPageComponent,
        canActivate: [AdminGuard, ChangedPasswordGuard],
        data: {
          breadcrumb: 'داشبورد',
          roles: [UserTypeEnum.admin, UserTypeEnum.vendor],
        },
      },

      {
        path: 'user',
        loadComponent: () =>
          import('./pages/customer-page/customer-page.component').then(
            (m) => m.CustomerPageComponent,
          ),
        canActivate: [AdminGuard, ChangedPasswordGuard],
        data: {
          breadcrumb: 'کاربران',
          roles: [UserTypeEnum.admin],
        },
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full',
          },
          {
            path: 'list',
            component: CustomerListPageComponent,
            data: {
              breadcrumb: 'لیست مشتریان',
            },
          },
          {
            path: ':id',
            component: CustomerDetailPageComponent,
            data: {
              breadcrumb: 'اطلاعات مشتری',
            },
          },
        ],
      },

      {
        path: 'vendor',
        loadComponent: () =>
          import('./pages/vendor-profile-page/vendor-profile-page.component').then(
            (m) => m.VendorProfilePageComponent,
          ),
        canActivate: [AdminGuard],
        data: {
          breadcrumb: 'پروفایل',
          roles: [UserTypeEnum.vendor],
        },
        children: [
          {
            path: '',
            redirectTo: 'profile',
            pathMatch: 'full',
          },
          {
            path: 'profile',
            component: VendorProfilePageComponent,
            canActivate: [ChangedPasswordGuard],
            data: {
              breadcrumb: 'اطلاعات پذیرنده',
            },
          },
          {
            path: 'vendor-messages',
            component: VendorMessagePageComponent,
            canActivate: [ChangedPasswordGuard],
            data: {
              breadcrumb: 'پیام ها',
            },
          },
          {
            path: 'change-password',
            component: ChangePasswordPageComponent,
            data: {
              breadcrumb: 'تغییر رمز عبور',
            },
          },
        ],
      },

      {
        path: 'vendor-management',
        loadComponent: () =>
          import(
            './pages/vendor-management-page/vendor-management-page.component'
            ).then((m) => m.VendorManagementPageComponent),
        canActivate: [AdminGuard, ChangedPasswordGuard],
        data: {
          breadcrumb: 'کاربران',
          roles: [UserTypeEnum.admin],
        },
        children: [
          {
            path: '',
            redirectTo: 'vendor-list',
            pathMatch: 'full',
          },
          {
            path: 'vendor-list',
            component: VendorListPageComponent,
            data: {
              breadcrumb: 'لیست پذیرندگان',
            },
          },
          {
            path: ':id',
            component: VendorDetailPageComponent,
            data: {
              breadcrumb: 'اطلاعات پذیرنده',
            },
          },
        ],
      },

      {
        path: 'base-info',
        loadComponent: () =>
          import(
            './pages/base-information-page/base-information-page.component'
            ).then((m) => m.BaseInformationPageComponent),
        canActivate: [AdminGuard, ChangedPasswordGuard],
        data: {
          breadcrumb: 'اطلاعات پایه',
          roles: [UserTypeEnum.admin],
        },
        children: [
          {
            path: 'product-item-category',
            component: ProductCategoryPageComponent,
            data: {
              breadcrumb: 'دسته بندی محصولات',
            },
          },
          {
            path: 'product-item-color',
            component: ProductColorPageComponent,
            data: {
              breadcrumb: 'رنگ محصولات',
            },
          },
          {
            path: 'product-item-brand',
            component: ProductBrandPageComponent,
            data: {
              breadcrumb: 'برند محصولات',
            },
          },
        ],
      },

      {
        path: 'fiscal',
        loadComponent: () =>
          import('./pages/fiscal-page/fiscal-page.component').then(
            (m) => m.FiscalPageComponent,
          ),
        canActivate: [AdminGuard, ChangedPasswordGuard],
        data: {
          breadcrumb: 'مالی',
          roles: [UserTypeEnum.admin],
        },
        children: [
          {
            path: '',
            redirectTo: 'vendors-list',
            pathMatch: 'full',
          },
          {
            path: 'vendors-list',
            component: VendorsListPageComponent,
            data: {
              breadcrumb: 'تسویه',
            },
          },

          {
            path: 'settlement-reports-list',
            component: SettlementReportsListPageComponent,
            data: {
              breadcrumb: 'تراکنش ها',
            },
          },

          {
            path: ':id',
            component: VendorSettlementListPageComponent,
            data: {
              breadcrumb: 'لیست تسویه حساب های تامین کننده',
            },
          },
        ],
      },

      {
        path: 'fiscal-vendor',
        loadComponent: () =>
          import('./pages/fiscal-page/fiscal-page.component').then(
            (m) => m.FiscalPageComponent,
          ),
        canActivate: [AdminGuard, ChangedPasswordGuard],
        data: {
          breadcrumb: 'مالی',
          roles: [UserTypeEnum.vendor],
        },
        children: [
          {
            path: '',
            redirectTo: 'settlement-reports-list',
            pathMatch: 'full',
          },
          {
            path: 'settlement-reports-list',
            component: SettlementReportsListPageComponent,
            data: {
              breadcrumb: 'تراکنش ها',
            },
          },
        ],
      },

      {
        path: 'product',
        loadComponent: () =>
          import('./pages/product-page/product-page.component').then(
            (m) => m.ProductPageComponent,
          ),
        canActivate: [AdminGuard, ChangedPasswordGuard],
        data: {
          breadcrumb: 'محصولات',
          roles: [UserTypeEnum.admin, UserTypeEnum.vendor],
        },
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full',
          },
          {
            path: 'add',
            component: ProductAddPageComponent,
            canActivate: [AdminGuard],
            data: {
              breadcrumb: 'ایجاد محصول',
              roles: [UserTypeEnum.vendor],
            },
          },
          {
            path: 'edit/:id',
            component: ProductAddPageComponent,
            canActivate: [AdminGuard],
            data: {
              breadcrumb: 'ویرایش محصول',
              roles: [UserTypeEnum.vendor, UserTypeEnum.admin],
            },
          },
          {
            path: 'edit/:id/:editPrice',
            component: ProductAddPageComponent,
            canActivate: [AdminGuard],
            data: {
              breadcrumb: 'ویرایش قیمت محصول',
              roles: [UserTypeEnum.vendor, UserTypeEnum.admin],
            },
          },
          {
            path: 'list',
            component: ProductsListPageComponent,
            data: {
              breadcrumb: 'لیست محصولات',
            },
          },
          {
            path: ':id',
            component: ProductInfoPageComponent,
            data: {
              breadcrumb: 'اطلاعات محصول',
            },
          },
        ],
      },

      {
        path: 'order',
        loadComponent: () =>
          import('./pages/order-page/order-page.component').then(
            (m) => m.OrderPageComponent,
          ),
        canActivate: [AdminGuard, ChangedPasswordGuard],
        data: {
          breadcrumb: 'سفارشات',
          roles: [UserTypeEnum.admin, UserTypeEnum.vendor],
        },
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full',
          },
          {
            path: 'list',
            component: OrderListPageComponent,
            data: {
              breadcrumb: 'لیست سفارشات',
            },
          },
          {
            path: ':id',
            component: OrderDetailPageComponent,
            data: {
              breadcrumb: 'اطلاعات سفارش',
            },
          },
        ],
      },

      {
        path: 'payment',
        loadComponent: () =>
          import('./pages/payment-page/payment-page.component').then(
            (m) => m.PaymentPageComponent,
          ),
        canActivate: [AdminGuard, ChangedPasswordGuard],
        data: {
          breadcrumb: 'پرداخت',
          roles: [UserTypeEnum.admin],
        },
        children: [
          {
            path: '',
            redirectTo: 'billing-information',
            pathMatch: 'full',
          },
          {
            path: 'billing-information',
            component: BillingInformationPageComponent,
            data: {
              breadcrumb: 'صورتحساب سفارشات',
            },
          },
        ],
      },

      {
        path: 'statistics',
        loadComponent: () =>
          import('./pages/report-page/report-page.component').then(
            (m) => m.ReportPageComponent,
          ),
        canActivate: [AdminGuard, ChangedPasswordGuard],
        data: {
          breadcrumb: 'گزارشات',
          roles: [UserTypeEnum.admin],
        },
        children: [
          {
            path: '',
            redirectTo: 'orders',
            pathMatch: 'full',
          },
          {
            path: 'orders',
            component: StatisticOrderPageComponent,
            data: {
              breadcrumb: 'سفارشات',
            },
          },
        ],
      },

      {
        path: 'management',
        loadComponent: () =>
          import('./pages/management-page/management-page.component').then(
            (m) => m.ManagementPageComponent,
          ),
        canActivate: [AdminGuard, ChangedPasswordGuard],
        data: {
          breadcrumb: 'مدیریت',
          roles: [UserTypeEnum.admin],
        },
        children: [
          {
            path: '',
            redirectTo: 'comments-list',
            pathMatch: 'full',
          },
          {
            path: 'comments-list',
            component: ManagementCommentsListPageComponent,
            data: {
              breadcrumb: 'نظرات',
            },
          },
        ],
      },

      {
        path: 'ticket',
        loadComponent: () =>
          import('./pages/ticket-page/ticket-page.component').then(
            (m) => m.TicketPageComponent,
          ),
        canActivate: [AdminGuard, ChangedPasswordGuard],
        data: {
          breadcrumb: 'مدیریت تیکت ها',
          roles: [UserTypeEnum.admin],
        },
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full',
          },
          {
            path: 'list',
            component: TicketListPageComponent,
            data: {
              breadcrumb: 'لیست تیکت ها',
            },
          },
          {
            path: ':id',
            component: TicketInfoPageComponent,
            data: {
              breadcrumb: 'مشاهده تیکت',
            },
          },
        ],
      },
    ]
  },
  {
    path: 'vendor-register',
    loadComponent: () =>
      import(
        './pages/vendor-registration-page/vendor-registration-page.component'
        ).then((m) => m.VendorRegistrationPageComponent),
    canActivate: [NoAuthGuardGuard],
  },
  {
    path: 'login',
    canActivate: [NoAuthGuardGuard],
    loadComponent: () =>
      import('./pages/login-page/login-page.component').then(
        (m) => m.LoginPageComponent,
      ),
  },
  {component: NotFoundComponent, path: 'not_found'},
  {path: '**', redirectTo: 'not_found'},
];
