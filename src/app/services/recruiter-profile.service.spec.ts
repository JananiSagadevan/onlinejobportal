import { TestBed } from '@angular/core/testing';

import { RecruiterProfileService } from './recruiter-profile.service';

describe('RecruiterProfileService', () => {
  let service: RecruiterProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecruiterProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
