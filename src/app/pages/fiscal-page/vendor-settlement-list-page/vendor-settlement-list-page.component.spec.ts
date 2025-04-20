import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorSettlementListPageComponent } from './vendor-settlement-list-page.component';

describe('VendorSettlementListPageComponent', () => {
  let component: VendorSettlementListPageComponent;
  let fixture: ComponentFixture<VendorSettlementListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorSettlementListPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VendorSettlementListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
