import { async, TestBed } from '@angular/core/testing';
import { MobileFitnessComponent } from './mobile-fitness.component';
describe('MobileFitnessComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MobileFitnessComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(MobileFitnessComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=mobile-fitness.component.spec.js.map