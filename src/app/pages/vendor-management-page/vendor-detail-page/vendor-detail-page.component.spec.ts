import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorDetailPageComponent } from './vendor-detail-page.component';

describe('VendorDetailPageComponent', () => {
  let component: VendorDetailPageComponent;
  let fixture: ComponentFixture<VendorDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorDetailPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VendorDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
