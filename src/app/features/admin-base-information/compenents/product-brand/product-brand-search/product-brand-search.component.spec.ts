import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBrandSearchComponent } from './product-brand-search.component';

describe('ProductBrandSearchComponent', () => {
  let component: ProductBrandSearchComponent;
  let fixture: ComponentFixture<ProductBrandSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductBrandSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductBrandSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
