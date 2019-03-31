import { TestBed } from '@angular/core/testing';

import { OptometristAlgorithmService } from './optometrist-algorithm.service';

describe('OptometristAlgorithmService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OptometristAlgorithmService = TestBed.get(OptometristAlgorithmService);
    expect(service).toBeTruthy();
  });
});
