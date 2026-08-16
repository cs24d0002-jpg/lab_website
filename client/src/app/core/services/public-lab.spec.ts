import { TestBed } from '@angular/core/testing';

import { PublicLab } from './public-lab';

describe('PublicLab', () => {
  let service: PublicLab;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicLab);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
