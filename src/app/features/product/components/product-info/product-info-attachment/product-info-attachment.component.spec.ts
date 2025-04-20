import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInfoAttachmentComponent } from './product-info-attachment.component';

describe('ProductInfoAttachmentComponent', () => {
  let component: ProductInfoAttachmentComponent;
  let fixture: ComponentFixture<ProductInfoAttachmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductInfoAttachmentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductInfoAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
