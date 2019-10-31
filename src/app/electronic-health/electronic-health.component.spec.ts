import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectronicHealthComponent } from './electronic-health.component';

describe('ElectronicHealthComponent', () => {
  let component: ElectronicHealthComponent;
  let fixture: ComponentFixture<ElectronicHealthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectronicHealthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectronicHealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
