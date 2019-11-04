import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectronicHealthTypeComponent } from './electronic-health-type.component';

describe('ElectronicHealthTypeComponent', () => {
  let component: ElectronicHealthTypeComponent;
  let fixture: ComponentFixture<ElectronicHealthTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectronicHealthTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectronicHealthTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
