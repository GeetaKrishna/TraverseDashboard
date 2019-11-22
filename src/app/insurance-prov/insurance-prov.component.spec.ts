import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceProvComponent } from './insurance-prov.component';

describe('InsuranceProvComponent', () => {
  let component: InsuranceProvComponent;
  let fixture: ComponentFixture<InsuranceProvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceProvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceProvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
