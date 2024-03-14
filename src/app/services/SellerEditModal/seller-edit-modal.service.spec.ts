import { TestBed } from '@angular/core/testing';

import { SellerEditModalService } from './seller-edit-modal.service';

describe('SellerEditModalService', () => {
  let service: SellerEditModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellerEditModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
