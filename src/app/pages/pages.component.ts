import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../features/layout/components/navbar/navbar.component';
import {
  NzContentComponent,
  NzHeaderComponent,
  NzLayoutComponent,
  NzSiderComponent,
} from 'ng-zorro-antd/layout';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import {
  NzMenuDirective,
  NzMenuItemComponent,
  NzSubMenuComponent,
} from 'ng-zorro-antd/menu';
import { HeaderComponent } from '../features/layout/components/header/header.component';
import { NzBreadCrumbComponent } from 'ng-zorro-antd/breadcrumb';

@Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html',
    imports: [
        RouterOutlet,
        NavbarComponent,
        NzContentComponent,
        NzHeaderComponent,
        NzIconDirective,
        NzLayoutComponent,
        NzMenuDirective,
        NzMenuItemComponent,
        NzSiderComponent,
        NzSubMenuComponent,
        HeaderComponent,
        NzBreadCrumbComponent,
    ],
    styleUrls: ['./pages.component.scss']
})
export class PagesComponent {
  @Input() isCollapsed = false;

  getLastTrigger(is: boolean) {
    this.isCollapsed = is;
  }
}
