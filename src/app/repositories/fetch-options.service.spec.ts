import { TestBed } from '@angular/core/testing';

import { FetchOptionsService } from './fetch-options.service';

describe('FetchOptionsService', () => {
  let service: FetchOptionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchOptionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
