import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import {UserTypeEnum} from '../enums/user-type.enum';

export class RoleUtil {
  static isAdmin() {
    const userRole = inject(AuthService).getRole();
    return userRole === UserTypeEnum.admin;
  }
}
