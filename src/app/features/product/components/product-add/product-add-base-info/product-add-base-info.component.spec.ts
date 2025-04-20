import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAddBaseInfoComponent } from './product-add-base-info.component';

describe('ProductAddBaseInfoComponent', () => {
  let component: ProductAddBaseInfoComponent;
  let fixture: ComponentFixture<ProductAddBaseInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductAddBaseInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductAddBaseInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
