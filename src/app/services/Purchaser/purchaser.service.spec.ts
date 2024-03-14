import { TestBed } from '@angular/core/testing';

import { PurchaserService } from './purchaser.service';

describe('PurchaserService', () => {
  let service: PurchaserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchaserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
