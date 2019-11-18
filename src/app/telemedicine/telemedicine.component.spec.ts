import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelemedicineComponent } from './telemedicine.component';

describe('TelemedicineComponent', () => {
  let component: TelemedicineComponent;
  let fixture: ComponentFixture<TelemedicineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelemedicineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelemedicineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
