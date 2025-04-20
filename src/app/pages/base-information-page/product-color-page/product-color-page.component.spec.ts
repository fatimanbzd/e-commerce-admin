import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductColorPageComponent } from './product-color-page.component';

describe('ProductColorPageComponent', () => {
  let component: ProductColorPageComponent;
  let fixture: ComponentFixture<ProductColorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductColorPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductColorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
