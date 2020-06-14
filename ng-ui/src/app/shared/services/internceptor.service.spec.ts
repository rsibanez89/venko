import { TestBed } from '@angular/core/testing';

import { InternceptorService } from './internceptor.service';

describe('InternceptorService', () => {
  let service: InternceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InternceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
