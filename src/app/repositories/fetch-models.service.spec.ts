import { TestBed } from '@angular/core/testing';

import { FetchModelsService } from './fetch-models.service';

describe('FetchModelsService', () => {
  let service: FetchModelsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchModelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
