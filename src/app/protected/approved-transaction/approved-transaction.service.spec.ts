import { TestBed } from '@angular/core/testing';

import { ApprovedTransactionService } from './approved-transaction.service';

describe('ApprovedTransactionService', () => {
  let service: ApprovedTransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApprovedTransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
