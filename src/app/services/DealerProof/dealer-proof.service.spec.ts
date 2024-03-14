import { TestBed } from '@angular/core/testing';

import { DealerProofService } from './dealer-proof.service';

describe('DealerProofService', () => {
  let service: DealerProofService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DealerProofService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
