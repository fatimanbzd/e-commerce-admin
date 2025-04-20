import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBrandListComponent } from './product-brand-list.component';

describe('ProductBrandListComponent', () => {
  let component: ProductBrandListComponent;
  let fixture: ComponentFixture<ProductBrandListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductBrandListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductBrandListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
