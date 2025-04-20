import { TestBed } from '@angular/core/testing';

import { ProductAttachmentService } from './product-attachment.service';

describe('ProductAttachmentService', () => {
  let service: ProductAttachmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductAttachmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
