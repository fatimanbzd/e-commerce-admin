import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorAttachmentInfoComponent } from './vendor-attachment-info.component';

describe('VendorAttachmentInfoComponent', () => {
  let component: VendorAttachmentInfoComponent;
  let fixture: ComponentFixture<VendorAttachmentInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorAttachmentInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VendorAttachmentInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
