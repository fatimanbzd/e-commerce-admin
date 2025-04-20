import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorAddressInfoComponent } from './vendor-address-info.component';

describe('VendorAddressInfoComponent', () => {
  let component: VendorAddressInfoComponent;
  let fixture: ComponentFixture<VendorAddressInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorAddressInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VendorAddressInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
