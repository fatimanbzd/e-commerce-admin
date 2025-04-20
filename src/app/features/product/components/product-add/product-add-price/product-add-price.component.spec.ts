import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAddPriceComponent } from './product-add-price.component';

describe('ProductAddPriceComponent', () => {
  let component: ProductAddPriceComponent;
  let fixture: ComponentFixture<ProductAddPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductAddPriceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductAddPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
