import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyRoomComponent } from './emergency-room.component';

describe('EmergencyRoomComponent', () => {
  let component: EmergencyRoomComponent;
  let fixture: ComponentFixture<EmergencyRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmergencyRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergencyRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
