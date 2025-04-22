import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {BrowserAnimationsModule, provideAnimations} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {provideToastr} from 'ngx-toastr';
import { provideNzIcons } from './icons-provider';import {fa_IR, provideNzI18n} from 'ng-zorro-antd/i18n';
import {faIR} from 'date-fns/locale';
import {authInterceptor} from './shared/interceptors/auth.interceptor';
import {httpsRequestInterceptor} from './shared/interceptors/https-path-resolver.interceptor';
import {ErrorInterceptor} from './shared/interceptors/error-handling.interceptor';
import {LoaderInterceptor} from './shared/interceptors/loader.interceptor';
import {AuthService} from './shared/services/auth.service';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {provideDateFnsAdapter} from 'ngx-material-date-fns-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import {environment} from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(FormsModule, BrowserModule, BrowserAnimationsModule),
    provideToastr({
      timeOut: 10000,
      positionClass: 'toast-bottom-left',
      preventDuplicates: true,
    }),
    provideDateFnsAdapter(),
    provideNzIcons(),
    provideNzI18n(fa_IR),
    {provide: MAT_DATE_LOCALE, useValue: faIR},

    {provide: HTTP_INTERCEPTORS, useClass: authInterceptor, multi: true},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: httpsRequestInterceptor,
      multi: true,
    },
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true},

    {provide: 'environment', useValue: environment},
    {provide: 'authService', useClass: AuthService},

    {provide: LocationStrategy, useClass: HashLocationStrategy},]
};
