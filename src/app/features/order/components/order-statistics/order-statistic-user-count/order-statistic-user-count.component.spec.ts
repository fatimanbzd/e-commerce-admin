import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStatisticUserCountComponent } from './order-statistic-user-count.component';

describe('OrderStatisticUserCountComponent', () => {
  let component: OrderStatisticUserCountComponent;
  let fixture: ComponentFixture<OrderStatisticUserCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderStatisticUserCountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderStatisticUserCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
