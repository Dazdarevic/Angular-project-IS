import { TestBed } from '@angular/core/testing';

import { ClientProfileServiceService } from './client-profile-service.service';

describe('ClientProfileServiceService', () => {
  let service: ClientProfileServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientProfileServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
