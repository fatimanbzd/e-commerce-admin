import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import {UserTypeEnum} from '../../shared/enums/user-type.enum';

export const AdminGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const expectedRoles: UserTypeEnum[] = route.data['roles'];
  const userRole: UserTypeEnum | undefined = inject(AuthService).getRole();
  if (
    inject(AuthService).isLoggedIn() &&
    expectedRoles.some((role) => userRole && userRole === role)
  ) {
    return true;
  } else {
    return inject(Router).createUrlTree(['/login']);
  }
};
