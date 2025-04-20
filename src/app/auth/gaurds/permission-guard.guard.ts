import { CanActivateFn } from '@angular/router';

export const permissionGuardGuard: CanActivateFn = (route, state) => {
  return true;
};
