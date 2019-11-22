import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordsProvTypeComponent } from './records-prov-type.component';

describe('RecordsProvTypeComponent', () => {
  let component: RecordsProvTypeComponent;
  let fixture: ComponentFixture<RecordsProvTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordsProvTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordsProvTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
