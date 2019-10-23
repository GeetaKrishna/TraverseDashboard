import { TestBed } from '@angular/core/testing';
import { MedicationService } from './medication.service';
describe('MedicationService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));
    it('should be created', () => {
        const service = TestBed.get(MedicationService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=medication.service.spec.js.map