import { Component } from '@angular/core';
import { ChangePasswordComponent } from '../../../features/account/components/change-password/change-password.component';

@Component({
    selector: 'admin-change-password-page',
    imports: [ChangePasswordComponent],
    templateUrl: './change-password-page.component.html',
    styleUrl: './change-password-page.component.scss'
})
export class ChangePasswordPageComponent {}
