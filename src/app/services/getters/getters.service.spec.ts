import { TestBed } from '@angular/core/testing';

import { GettersService } from './getters.service';

describe('GettersService', () => {
  let service: GettersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GettersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
