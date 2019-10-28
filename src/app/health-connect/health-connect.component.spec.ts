import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthConnectComponent } from './health-connect.component';

describe('HealthConnectComponent', () => {
  let component: HealthConnectComponent;
  let fixture: ComponentFixture<HealthConnectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthConnectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthConnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
