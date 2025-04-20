import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorSettlementListComponent } from './vendor-settlement-list.component';

describe('VendorSettlementListComponent', () => {
  let component: VendorSettlementListComponent;
  let fixture: ComponentFixture<VendorSettlementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorSettlementListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VendorSettlementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
