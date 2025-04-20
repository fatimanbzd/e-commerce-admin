import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStatisticOrderCountComponent } from './order-statistic-order-count.component';

describe('OrderStatisticOrderCountComponent', () => {
  let component: OrderStatisticOrderCountComponent;
  let fixture: ComponentFixture<OrderStatisticOrderCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderStatisticOrderCountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderStatisticOrderCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
