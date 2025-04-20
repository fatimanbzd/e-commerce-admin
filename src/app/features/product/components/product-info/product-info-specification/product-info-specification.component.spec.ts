import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInfoSpecificationComponent } from './product-info-specification.component';

describe('ProductInfoSpecificationComponent', () => {
  let component: ProductInfoSpecificationComponent;
  let fixture: ComponentFixture<ProductInfoSpecificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductInfoSpecificationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductInfoSpecificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
