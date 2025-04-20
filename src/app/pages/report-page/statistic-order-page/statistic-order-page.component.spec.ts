import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticOrderPageComponent } from './statistic-order-page.component';

describe('StatisticOrderPageComponent', () => {
  let component: StatisticOrderPageComponent;
  let fixture: ComponentFixture<StatisticOrderPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticOrderPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticOrderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
