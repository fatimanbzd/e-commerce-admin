import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingSearchComponent } from './billing-search.component';

describe('BillingSearchComponent', () => {
  let component: BillingSearchComponent;
  let fixture: ComponentFixture<BillingSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillingSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillingSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
