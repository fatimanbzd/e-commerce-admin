import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInfoBaseComponent } from './product-info-base.component';

describe('ProductInfoBaseComponent', () => {
  let component: ProductInfoBaseComponent;
  let fixture: ComponentFixture<ProductInfoBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductInfoBaseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductInfoBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
