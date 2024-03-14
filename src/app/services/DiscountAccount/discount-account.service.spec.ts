import { TestBed } from '@angular/core/testing';

import { DiscountAccountService } from './discount-account.service';

describe('DiscountAccountService', () => {
  let service: DiscountAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscountAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
