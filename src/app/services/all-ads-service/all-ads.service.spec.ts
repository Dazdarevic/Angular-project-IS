import { TestBed } from '@angular/core/testing';

import { AllAdsService } from './all-ads.service';

describe('AllAdsService', () => {
  let service: AllAdsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllAdsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
