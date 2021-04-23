import { TestBed } from '@angular/core/testing';

import { AuthgurdService } from './authgurd.service';

describe('AuthgurdService', () => {
  let service: AuthgurdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthgurdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
