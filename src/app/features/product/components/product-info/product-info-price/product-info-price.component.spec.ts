import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInfoPriceComponent } from './product-info-price.component';

describe('ProductInfoPriceComponent', () => {
  let component: ProductInfoPriceComponent;
  let fixture: ComponentFixture<ProductInfoPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductInfoPriceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductInfoPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
