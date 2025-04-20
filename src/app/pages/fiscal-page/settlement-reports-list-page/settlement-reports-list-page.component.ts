import { Component } from '@angular/core';
import { SettlementReportsListComponent } from '../../../features/fiscal/components/settlement-reports-list/settlement-reports-list.component';

@Component({
    selector: 'admin-settlement-reports-list-page',
    imports: [SettlementReportsListComponent],
    templateUrl: './settlement-reports-list-page.component.html',
    styleUrl: './settlement-reports-list-page.component.scss'
})
export class SettlementReportsListPageComponent {}
