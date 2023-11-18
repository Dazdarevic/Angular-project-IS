import { TestBed } from '@angular/core/testing';

import { CreateAdvertiseService } from './create-advertise.service';

describe('CreateAdvertiseService', () => {
  let service: CreateAdvertiseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateAdvertiseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
