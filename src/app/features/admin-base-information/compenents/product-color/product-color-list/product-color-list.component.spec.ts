import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductColorListComponent } from './product-color-list.component';

describe('ProductColorListComponent', () => {
  let component: ProductColorListComponent;
  let fixture: ComponentFixture<ProductColorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductColorListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductColorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
