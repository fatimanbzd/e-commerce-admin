import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettlementReportsListPageComponent } from './settlement-reports-list-page.component';

describe('SettlementReportsListPageComponent', () => {
  let component: SettlementReportsListPageComponent;
  let fixture: ComponentFixture<SettlementReportsListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettlementReportsListPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SettlementReportsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
