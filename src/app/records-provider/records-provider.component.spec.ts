import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordsProviderComponent } from './records-provider.component';

describe('RecordsProviderComponent', () => {
  let component: RecordsProviderComponent;
  let fixture: ComponentFixture<RecordsProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordsProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordsProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
