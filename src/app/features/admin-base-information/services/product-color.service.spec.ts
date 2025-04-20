import { TestBed } from '@angular/core/testing';

import { ProductColorService } from './product-color.service';

describe('ProductColorService', () => {
  let service: ProductColorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductColorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
