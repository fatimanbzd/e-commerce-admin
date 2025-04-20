import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

export const NoAuthGuardGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const isAuthentication = inject(AuthService).isLoggedIn();
  if (isAuthentication) {
    inject(Router).navigateByUrl('/pages');
  }
  return !isAuthentication;
};
