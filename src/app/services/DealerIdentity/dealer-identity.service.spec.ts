import { TestBed } from '@angular/core/testing';

import { DealerIdentityService } from './dealer-identity.service';

describe('DealerIdentityService', () => {
  let service: DealerIdentityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DealerIdentityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
