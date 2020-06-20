import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsyncContainerComponent } from './async-container.component';

describe('AsyncContainerComponent', () => {
  let component: AsyncContainerComponent;
  let fixture: ComponentFixture<AsyncContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsyncContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsyncContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
