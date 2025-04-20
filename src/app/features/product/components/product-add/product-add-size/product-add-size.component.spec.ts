import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAddSizeComponent } from './product-add-size.component';

describe('ProductAddSizeComponent', () => {
  let component: ProductAddSizeComponent;
  let fixture: ComponentFixture<ProductAddSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductAddSizeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductAddSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
