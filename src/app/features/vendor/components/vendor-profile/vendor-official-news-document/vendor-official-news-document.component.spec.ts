import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorOfficialNewsDocumentComponent } from './vendor-official-news-document.component';

describe('VendorOfficialNewsDocumentComponent', () => {
  let component: VendorOfficialNewsDocumentComponent;
  let fixture: ComponentFixture<VendorOfficialNewsDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorOfficialNewsDocumentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VendorOfficialNewsDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
