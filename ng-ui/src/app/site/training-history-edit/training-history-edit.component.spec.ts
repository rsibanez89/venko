import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingHistoryEditComponent } from './training-history-edit.component';

describe('TrainingHistoryEditComponent', () => {
  let component: TrainingHistoryEditComponent;
  let fixture: ComponentFixture<TrainingHistoryEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingHistoryEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingHistoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
