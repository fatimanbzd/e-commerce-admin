import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorDocumentAttachmentComponent } from './vendor-document-attachment.component';

describe('VendorDocumentAttachmentComponent', () => {
  let component: VendorDocumentAttachmentComponent;
  let fixture: ComponentFixture<VendorDocumentAttachmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorDocumentAttachmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorDocumentAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
