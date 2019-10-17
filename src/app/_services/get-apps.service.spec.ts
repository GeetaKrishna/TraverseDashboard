import { TestBed } from '@angular/core/testing';

import { GetAppsService } from './get-apps.service';

describe('GetAppsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetAppsService = TestBed.get(GetAppsService);
    expect(service).toBeTruthy();
  });
});
