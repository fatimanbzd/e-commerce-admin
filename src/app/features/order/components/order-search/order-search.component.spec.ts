import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSearchComponent } from './order-search.component';

describe('OrderSearchComponent', () => {
  let component: OrderSearchComponent;
  let fixture: ComponentFixture<OrderSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderSearchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
