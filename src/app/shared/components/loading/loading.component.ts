import { Component } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'loading',
  imports: [NgxSpinnerModule],
  templateUrl: './loading.component.html',
  standalone: true,
  styleUrl: './loading.component.scss',
})
export class LoadingComponent {}
