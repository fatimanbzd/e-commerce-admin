import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorRealPersonalInfoComponent } from './vendor-real-personal-info.component';

describe('VendorRealPersonalInfoComponent', () => {
  let component: VendorRealPersonalInfoComponent;
  let fixture: ComponentFixture<VendorRealPersonalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorRealPersonalInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VendorRealPersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
