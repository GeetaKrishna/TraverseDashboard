import { async, TestBed } from '@angular/core/testing';
import { HealthKnowledgeContentComponent } from './health-knowledge-content.component';
describe('HealthKnowledgeContentComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HealthKnowledgeContentComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(HealthKnowledgeContentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=health-knowledge-content.component.spec.js.map