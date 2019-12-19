import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordPage3Component } from './forgot-password-page3.component';

describe('ForgotPasswordPage3Component', () => {
  let component: ForgotPasswordPage3Component;
  let fixture: ComponentFixture<ForgotPasswordPage3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPasswordPage3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordPage3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
