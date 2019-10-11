import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthKnowledgeBaseComponent } from './health-knowledge-base.component';

describe('HealthKnowledgeBaseComponent', () => {
  let component: HealthKnowledgeBaseComponent;
  let fixture: ComponentFixture<HealthKnowledgeBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthKnowledgeBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthKnowledgeBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
