import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategoryAddDialogComponent } from './product-category-add-dialog.component';

describe('ProductCategoryAddDialogComponent', () => {
  let component: ProductCategoryAddDialogComponent;
  let fixture: ComponentFixture<ProductCategoryAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCategoryAddDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCategoryAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
