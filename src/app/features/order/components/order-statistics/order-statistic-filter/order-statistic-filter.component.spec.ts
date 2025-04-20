import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStatisticFilterComponent } from './order-statistic-filter.component';

describe('OrderStatisticFilterComponent', () => {
  let component: OrderStatisticFilterComponent;
  let fixture: ComponentFixture<OrderStatisticFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderStatisticFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderStatisticFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
