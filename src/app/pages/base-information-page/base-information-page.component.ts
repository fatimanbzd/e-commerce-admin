import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'admin-base-information-page',
  imports: [RouterOutlet],
  templateUrl: './base-information-page.component.html',
  standalone: true,
  styleUrl: './base-information-page.component.scss',
})
export class BaseInformationPageComponent {}
