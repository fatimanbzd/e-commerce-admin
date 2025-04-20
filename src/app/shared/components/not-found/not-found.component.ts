import { Component } from '@angular/core';
import { NgIf, NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'core-not-found',
    imports: [NgOptimizedImage, NgIf],
    templateUrl: './not-found.component.html',
    styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {}
