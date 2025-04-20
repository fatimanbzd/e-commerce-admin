import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBrandCreateDialogComponent } from './product-brand-create-dialog.component';

describe('ProductBrandCreateDialogComponent', () => {
  let component: ProductBrandCreateDialogComponent;
  let fixture: ComponentFixture<ProductBrandCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductBrandCreateDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductBrandCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
