import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, EMPTY, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { UserInformationStorageService } from '../services/user-information-storage.service';
import { TokenStorageService } from '../services/token-storage.service';
import {IEnvironmentModel} from '../interfaces/environment.model';

@Injectable({
  providedIn: 'root',
})
export class authInterceptor implements HttpInterceptor {
  constructor(
    @Inject('environment') private environment: IEnvironmentModel,
    private tokenStorageService: TokenStorageService,
    private userInformationStorageService: UserInformationStorageService,
    private router: Router,
  ) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const accessToken = this.tokenStorageService.getAccessToken();
    if (accessToken) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${accessToken.token}` },
      });
    }

    return next.handle(req).pipe((s) => this.handleErrors(s, req.url));
  }

  private handleErrors(
    source: Observable<HttpEvent<unknown>>,
    urlPath: string,
  ): Observable<HttpEvent<unknown>> {
    return source.pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.handle401();
        }

        return throwError(() => error);
      }),
    );
  }

  private handle401() {
    this.tokenStorageService.removeTokens();
    this.userInformationStorageService.removeUserInformation();
    this.router.navigate(['/login']);
    return EMPTY;
  }
}
