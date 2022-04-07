import { TestBed } from '@angular/core/testing';

import { KushkiApiService } from './kushki-api.service';

describe('KushkiApiService', () => {
  let service: KushkiApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KushkiApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
