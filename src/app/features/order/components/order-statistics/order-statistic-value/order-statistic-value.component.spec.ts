import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStatisticValueComponent } from './order-statistic-value.component';

describe('OrderStatisticValueComponent', () => {
  let component: OrderStatisticValueComponent;
  let fixture: ComponentFixture<OrderStatisticValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderStatisticValueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderStatisticValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
