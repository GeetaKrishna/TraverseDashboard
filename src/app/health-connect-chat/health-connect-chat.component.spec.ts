import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthConnectChatComponent } from './health-connect-chat.component';

describe('HealthConnectChatComponent', () => {
  let component: HealthConnectChatComponent;
  let fixture: ComponentFixture<HealthConnectChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthConnectChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthConnectChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
