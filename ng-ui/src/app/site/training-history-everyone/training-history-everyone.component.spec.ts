import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingHistoryEveryoneComponent } from './training-history-everyone.component';

describe('TrainingHistoryEveryoneComponent', () => {
  let component: TrainingHistoryEveryoneComponent;
  let fixture: ComponentFixture<TrainingHistoryEveryoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingHistoryEveryoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingHistoryEveryoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
