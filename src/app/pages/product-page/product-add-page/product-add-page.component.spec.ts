import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAddPageComponent } from './product-add-page.component';

describe('ProductAddPageComponent', () => {
  let component: ProductAddPageComponent;
  let fixture: ComponentFixture<ProductAddPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductAddPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
