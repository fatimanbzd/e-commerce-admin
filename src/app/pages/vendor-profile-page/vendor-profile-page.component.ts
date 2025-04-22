import {Component} from '@angular/core';
import {VendorProfileComponent} from '../../features/vendor/components/vendor-profile/vendor-profile.component';

@Component({
  selector: 'admin-vendor-profile-profile-page',
  imports: [VendorProfileComponent],
  templateUrl: './vendor-profile-page.component.html',
  styleUrl: './vendor-profile-page.component.scss'
})
export class VendorProfilePageComponent {
}
