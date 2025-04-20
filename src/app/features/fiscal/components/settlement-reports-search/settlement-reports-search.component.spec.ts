import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettlementReportsSearchComponent } from './settlement-reports-search.component';

describe('SettlementReportsSearchComponent', () => {
  let component: SettlementReportsSearchComponent;
  let fixture: ComponentFixture<SettlementReportsSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettlementReportsSearchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SettlementReportsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
