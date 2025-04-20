import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorLogoAttachmentComponent } from './vendor-logo-attachment.component';

describe('VendorLogoAttachmentComponent', () => {
  let component: VendorLogoAttachmentComponent;
  let fixture: ComponentFixture<VendorLogoAttachmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorLogoAttachmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorLogoAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
