import { TestBed } from '@angular/core/testing';

import { FiscalService } from './fiscal.service';

describe('FiscalService', () => {
  let service: FiscalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiscalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
