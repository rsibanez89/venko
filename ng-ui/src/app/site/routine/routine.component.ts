import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { faWindowMaximize, faWindowRestore } from '@fortawesome/free-solid-svg-icons';
import { AppState } from '../../store/app/app.reducer';
import { getRoutineById } from '../../store/routines/routines.actions';
import { Observable } from 'rxjs';
import {
  getRoutinesIsLoading,
  getSelectedRoutine,
} from '../../store/routines/routines.selector';
import { environment } from '../../../environments/environment';
import { Exercise } from '../../store/routines/routines.dto';
import { TimerComponent } from '../../shared/components/timer/timer.component';

@Component({
  selector: 'venko-routine',
  templateUrl: './routine.component.html',
  styleUrls: ['./routine.component.scss'],
  providers: [],
})
export class RoutineComponent implements OnInit, AfterViewInit {
  public environment = environment;
  public faWindowMaximize = faWindowMaximize;
  public faWindowRestore = faWindowRestore;
  public routineIsLoading$: Observable<boolean>;
  public exercises$: Observable<Exercise[]>;
  public isTimerVisible = false;
  private isResting = false;
  public restTime = 30;
  public trainingTime = 30;
  @ViewChild(TimerComponent) timer: TimerComponent;
  @ViewChild(NgbCarousel) carousel: NgbCarousel;
  public isfullscreen = false;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.route.params.subscribe(p =>
      this.store.dispatch(getRoutineById({ routineId: p.routineId })),
    );

    this.routineIsLoading$ = this.store.pipe(select(getRoutinesIsLoading));
    this.exercises$ = this.store.pipe(select(getSelectedRoutine));
  }

  ngAfterViewInit(): void {
    this.carousel.pause();
  }

  public initTimer() {
    this.openfullscreen();
    this.isTimerVisible = true;
    this.timer.startTimer(this.trainingTime);
  }

  public stopTimer() {
    this.isTimerVisible = false;
    this.timer.stopTimer();
  }

  public whenTimerEnded() {
    this.isResting = !this.isResting;
    if (this.isResting) {
      this.carousel.next();
      this.timer.startTimer(this.restTime);
      this.timer.setDarkMode(false);
    } else {
      this.timer.startTimer(this.trainingTime);
      this.timer.setDarkMode(true);
    }
  }

  openfullscreen() {
    // Trigger fullscreen
    const elem = document.documentElement as HTMLElement & {
      mozRequestFullScreen(): Promise<void>;
      webkitRequestFullscreen(): Promise<void>;
      msRequestFullscreen(): Promise<void>;
    };

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen();
    }
    this.isfullscreen = true;
  }

  closefullscreen(){
    const doc = document as Document & {
      mozCancelFullScreen(): Promise<void>;
      webkitExitFullscreen(): Promise<void>;
      msExitFullscreen(): Promise<void>;
    };
    if (doc.exitFullscreen) {
      doc.exitFullscreen();
    } else if (doc.mozCancelFullScreen) { /* Firefox */
      doc.mozCancelFullScreen();
    } else if (doc.webkitExitFullscreen) { /* Chrome, Safari and Opera */
      doc.webkitExitFullscreen();
    } else if (doc.msExitFullscreen) { /* IE/Edge */
      doc.msExitFullscreen();
    }
    this.isfullscreen = false;
  }
}
