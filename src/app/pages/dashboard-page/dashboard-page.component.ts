import { Component } from '@angular/core';
import { DashboardComponent } from '../../features/dashboard/components/dashboard/dashboard.component';

@Component({
    selector: 'admin-dashboard-page',
    imports: [DashboardComponent],
    templateUrl: './dashboard-page.component.html',
    styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent {}
