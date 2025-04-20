import { Component } from '@angular/core';
import {
  ManagementCommentsListComponent
} from "../../../features/management/components/management-comments-list/management-comments-list.component";

@Component({
  selector: 'admin-management-comments-list-list-page',
  imports: [
    ManagementCommentsListComponent
  ],
  templateUrl: './management-comments-list-page.component.html',
  styleUrl: './management-comments-list-page.component.scss'
})
export class ManagementCommentsListPageComponent {

}
