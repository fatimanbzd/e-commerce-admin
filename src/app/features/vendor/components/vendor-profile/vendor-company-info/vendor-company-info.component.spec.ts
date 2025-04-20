import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorCompanyInfoComponent } from './vendor-company-info.component';

describe('VendorCompanyInfoComponent', () => {
  let component: VendorCompanyInfoComponent;
  let fixture: ComponentFixture<VendorCompanyInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorCompanyInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VendorCompanyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
