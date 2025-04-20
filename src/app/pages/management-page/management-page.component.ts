import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'admin-management-page',
    imports: [
        RouterOutlet
    ],
  templateUrl: './management-page.component.html',
  styleUrl: './management-page.component.scss'
})
export class ManagementPageComponent {

}
