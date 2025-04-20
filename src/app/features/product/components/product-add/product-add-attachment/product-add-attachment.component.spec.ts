import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAddAttachmentComponent } from './product-add-attachment.component';

describe('ProductAddAttachmentComponent', () => {
  let component: ProductAddAttachmentComponent;
  let fixture: ComponentFixture<ProductAddAttachmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductAddAttachmentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductAddAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
