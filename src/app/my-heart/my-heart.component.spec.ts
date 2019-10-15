import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyHeartComponent } from './my-heart.component';

describe('MyHeartComponent', () => {
  let component: MyHeartComponent;
  let fixture: ComponentFixture<MyHeartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyHeartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyHeartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
