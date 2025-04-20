import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAddSpecificationComponent } from './product-add-specification.component';

describe('ProductAddSpecificationComponent', () => {
  let component: ProductAddSpecificationComponent;
  let fixture: ComponentFixture<ProductAddSpecificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductAddSpecificationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductAddSpecificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
