import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorFinancialInfoComponent } from './vendor-financial-info.component';

describe('VendorFinancialInfoComponent', () => {
  let component: VendorFinancialInfoComponent;
  let fixture: ComponentFixture<VendorFinancialInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorFinancialInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VendorFinancialInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
