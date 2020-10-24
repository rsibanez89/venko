import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { NgbCarousel, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  faWindowMaximize,
  faWindowRestore,
} from '@fortawesome/free-solid-svg-icons';
import { AppState } from '../../store/app/app.reducer';
import {
  getRoutineById,
} from '../../store/routines/routines.actions';
import { Observable, of } from 'rxjs';
import * as dayjs from 'dayjs';
import {
  getRoutinesIsLoading,
  getSelectedRoutine,
  getSelectedRoutineType,
} from '../../store/routines/routines.selector';
import { environment } from '../../../environments/environment';
import { Exercise } from '../../store/routines/routines.dto';
import { TimerComponent } from '../../shared/components/timer/timer.component';
import { UsersService } from '../../../app/shared/services/users.service';
import { exhaustMap, filter, map } from 'rxjs/operators';
import { getTrainingHistoryForUser } from '../../../app/store/training-history/training-history.actions';
import {
  TrainingHistory,
  TrainingHistoryItem,
} from '../../../app/store/training-history/training-history.dto';
import { getTrainingHistory } from '../../../app/store/training-history/training-history.selector';

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
  private routineId: number;
  private exerciseCount: number;
  public isTimerVisible = false;
  private isResting = false;
  public restTime = 30;
  public dificulty = 'Easy';
  public routineType = 'Strong';
  public trainingTime = 30;
  @ViewChild(TimerComponent) timer: TimerComponent;
  @ViewChild(NgbCarousel) carousel: NgbCarousel;
  public isfullscreen = false;
  public userEmail: string;
  public selectedMonth: dayjs.Dayjs;
  public trainingHistory$: Observable<TrainingHistory>;
  public newItem: TrainingHistoryItem;
  private totalTime: Date;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private usersService: UsersService,
    private modalService: NgbModal,
  ) {
    this.selectedMonth = dayjs().startOf('month');
  }

  ngOnInit(): void {
    this.route.params.subscribe(p => {
      this.routineId = +p.routineId;
      this.store.dispatch(getRoutineById({ routineId: p.routineId }));
    });

    this.routineIsLoading$ = this.store.pipe(select(getRoutinesIsLoading));
    this.exercises$ = this.store.pipe(select(getSelectedRoutine));

    this.usersService.currentUser$
      .pipe(
        filter(profile => profile?.email != null),
        exhaustMap(profile => {
          this.userEmail = profile.email;
          this.store.dispatch(
            getTrainingHistoryForUser({
              email: this.userEmail,
              period: this.selectedMonth.format('YYYY-MM-DD'),
            }),
          );
          return of(null);
        }),
      )
      .subscribe();
    this.trainingHistory$ = this.store.pipe(select(getTrainingHistory));
    this.store
      .pipe(select(getSelectedRoutineType))
      .pipe(
        filter(type => type != null),
        map(type => (this.routineType = type)),
      )
      .subscribe();
  }

  ngAfterViewInit(): void {
    this.carousel.pause();
  }

  public initTimer() {
    this.openfullscreen();
    this.isTimerVisible = true;
    this.timer.startTimer(this.trainingTime);
    this.totalTime = new Date();
    this.exerciseCount = 1;
  }

  public pauseOrResumeTimer() {
    this.timer.pauseOrResumeTimer();
  }

  public stopTimer(modalContent) {
    this.isTimerVisible = false;
    this.timer.stopTimer();

    const milliseconds = new Date().getTime() - this.totalTime.getTime();
    const timespan = dayjs('2020-01-01').add(milliseconds, 'millisecond');

    this.newItem = {
      routineId: this.routineId,
      lapsCount: this.exerciseCount / 8,
      date: null,
      comments: null,
      dificulty: this.dificulty,
      duration: timespan.format('HH:mm:ss'),
      energyLevel: 5,
      mood: null,
      routineType: this.routineType as any,
      weight: null,
    };

    this.modalService.open(modalContent, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
    });
  }

  public whenTimerEnded() {
    this.isResting = !this.isResting;
    if (this.isResting) {
      this.exerciseCount++;
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
    } else if (elem.mozRequestFullScreen) {
      /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE/Edge */
      elem.msRequestFullscreen();
    }
    this.isfullscreen = true;
  }

  closefullscreen() {
    const doc = document as Document & {
      mozCancelFullScreen(): Promise<void>;
      webkitExitFullscreen(): Promise<void>;
      msExitFullscreen(): Promise<void>;
    };
    if (doc.exitFullscreen) {
      doc.exitFullscreen();
    } else if (doc.mozCancelFullScreen) {
      /* Firefox */
      doc.mozCancelFullScreen();
    } else if (doc.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      doc.webkitExitFullscreen();
    } else if (doc.msExitFullscreen) {
      /* IE/Edge */
      doc.msExitFullscreen();
    }
    this.isfullscreen = false;
  }

  public onCloseModal() {
    this.modalService.dismissAll();
  }
}
