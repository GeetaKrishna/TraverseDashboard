import { async, TestBed } from '@angular/core/testing';
import { HealthKnowledgeBaseComponent } from './health-knowledge-base.component';
describe('HealthKnowledgeBaseComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HealthKnowledgeBaseComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(HealthKnowledgeBaseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=health-knowledge-base.component.spec.js.map