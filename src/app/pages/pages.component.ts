import {Component, Input} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {NzContentComponent, NzHeaderComponent, NzLayoutComponent, NzSiderComponent} from "ng-zorro-antd/layout";
import {NavbarComponent} from "../features/layout/components/navbar/navbar.component";
import {NzBreadCrumbComponent} from "ng-zorro-antd/breadcrumb";
import {HeaderComponent} from "../features/layout/components/header/header.component";

@Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html',
    imports: [
        RouterOutlet,
        NzLayoutComponent,
        NavbarComponent,
        NzSiderComponent,
        NzBreadCrumbComponent,
        NzContentComponent,
        HeaderComponent,
        NzHeaderComponent
    ],
    styleUrls: ['./pages.component.scss']
})
export class PagesComponent {
    @Input() isCollapsed = false;

    getLastTrigger(is: boolean) {
        this.isCollapsed = is;
    }
}
