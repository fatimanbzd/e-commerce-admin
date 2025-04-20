import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAddSeoComponent } from './product-add-seo.component';

describe('ProductAddSeoComponent', () => {
  let component: ProductAddSeoComponent;
  let fixture: ComponentFixture<ProductAddSeoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductAddSeoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductAddSeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
