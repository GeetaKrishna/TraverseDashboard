import { TestBed } from '@angular/core/testing';
import { HealthService } from './health.service';
describe('HealthService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));
    it('should be created', () => {
        const service = TestBed.get(HealthService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=health.service.spec.js.map