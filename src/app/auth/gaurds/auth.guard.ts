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

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  if (!inject(AuthService).isLoggedIn()) {
    return inject(Router).navigate(['/login'], {
      queryParams: { returnUrl: state.url },
    });
  }
  return true;
};

// function checkUserLogin(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
//
//   if (inject(AuthService).isLoggedIn()) {
//     const userRole = inject(AuthService).getRole();
//     if (userRole === UserTypeEnum.admin)
//       return true;
//     inject(Router).navigateByUrl('/pages');
//     return false;
//
//   }
//
//   inject(Router).navigate(['/login'], {queryParams: {returnUrl: state.url}})
//   return false;
// }
