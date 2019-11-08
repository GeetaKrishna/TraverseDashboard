import { TestBed } from '@angular/core/testing';

import { MedicalConditionService } from './medical-condition.service';

describe('MedicalConditionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MedicalConditionService = TestBed.get(MedicalConditionService);
    expect(service).toBeTruthy();
  });
});
