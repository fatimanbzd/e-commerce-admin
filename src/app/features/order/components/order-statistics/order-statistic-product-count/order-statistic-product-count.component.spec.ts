import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStatisticProductCountComponent } from './order-statistic-product-count.component';

describe('OrderStatisticProductCountComponent', () => {
  let component: OrderStatisticProductCountComponent;
  let fixture: ComponentFixture<OrderStatisticProductCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderStatisticProductCountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderStatisticProductCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
