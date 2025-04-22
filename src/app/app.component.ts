import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {NgxSpinnerModule} from 'ngx-spinner';
import {LoadingComponent} from './shared/components/loading/loading.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, NgxSpinnerModule, LoadingComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
