import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { NzRibbonComponent } from 'ng-zorro-antd/badge';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EnumLabelPipe } from '../../../../../shared/pipes/enum-label.pipe';
import { VendorLogoAttachmentComponent } from '../vendor-logo-attachment/vendor-logo-attachment.component';
import { VendorDocumentAttachmentComponent } from '../vendor-document-attachment/vendor-document-attachment.component';

@Component({
  selector: 'vendor-attachment-info',
  imports: [
    NzCardComponent,
    NzDividerComponent,
    NzRibbonComponent,
    ReactiveFormsModule,
    FormsModule,
    VendorLogoAttachmentComponent,
    VendorDocumentAttachmentComponent,
  ],
  providers: [EnumLabelPipe],
  templateUrl: './vendor-attachment-info.component.html',
  styleUrl: './vendor-attachment-info.component.scss',
})
export class VendorAttachmentInfoComponent {
  @Input() selectedTab!: number;
  @Input() logo: string | null = null;
  @Output() updatedLogo = new EventEmitter();

  constructor() {}

  updateLogo() {
    this.updatedLogo.emit();
  }
}
