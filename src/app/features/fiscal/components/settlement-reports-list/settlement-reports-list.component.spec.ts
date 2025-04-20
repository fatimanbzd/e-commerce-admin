import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettlementReportsListComponent } from './settlement-reports-list.component';

describe('SettlementReportsListComponent', () => {
  let component: SettlementReportsListComponent;
  let fixture: ComponentFixture<SettlementReportsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettlementReportsListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SettlementReportsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
