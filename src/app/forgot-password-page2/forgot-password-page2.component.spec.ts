import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordPage2Component } from './forgot-password-page2.component';

describe('ForgotPasswordPage2Component', () => {
  let component: ForgotPasswordPage2Component;
  let fixture: ComponentFixture<ForgotPasswordPage2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPasswordPage2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordPage2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
