import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductColorCreateDialogComponent } from './product-color-create-dialog.component';

describe('ProductColorCreateLogComponent', () => {
  let component: ProductColorCreateDialogComponent;
  let fixture: ComponentFixture<ProductColorCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductColorCreateDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductColorCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
