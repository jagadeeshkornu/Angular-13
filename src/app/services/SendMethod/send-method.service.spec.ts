import { TestBed } from '@angular/core/testing';

import { SendMethodService } from './send-method.service';

describe('SendMethodService', () => {
  let service: SendMethodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendMethodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
