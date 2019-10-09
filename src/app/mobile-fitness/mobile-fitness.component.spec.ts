import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileFitnessComponent } from './mobile-fitness.component';

describe('MobileFitnessComponent', () => {
  let component: MobileFitnessComponent;
  let fixture: ComponentFixture<MobileFitnessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileFitnessComponent ]
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
