import { TestBed } from '@angular/core/testing';

import { MyHeartService } from './my-heart.service';

describe('MyHeartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyHeartService = TestBed.get(MyHeartService);
    expect(service).toBeTruthy();
  });
});
