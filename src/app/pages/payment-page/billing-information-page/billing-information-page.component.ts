import { Component } from '@angular/core';
import { BillingListComponent } from '../../../features/payment/components/billing-list/billing-list.component';

@Component({
  selector: 'admin-billing-information-page',
  imports: [BillingListComponent],
  templateUrl: './billing-information-page.component.html',
  styles: ``,
})
export class BillingInformationPageComponent {}
