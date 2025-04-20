import { AuthService } from '../services/auth.service';
import { UserTypeEnum } from '@core/enums/user-type.enum';
import { inject } from '@angular/core';

export class RoleUtil {
  static isAdmin() {
    const userRole = inject(AuthService).getRole();
    return userRole === UserTypeEnum.admin;
  }
}
