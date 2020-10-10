import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import * as dayjs from 'dayjs';
import { AppState } from '../../../app/store/app/app.reducer';
import { environment } from '../../../environments/environment';
import { UsersService } from '../../../app/shared/services/users.service';
import { TrainingHistory } from '../../../app/store/training-history/training-history.dto';
import { getTrainingHistoryForUser } from '../../../app/store/training-history/training-history.actions';
import {
  getTrainingHistory,
  getTrainingHistoryIsLoading,
} from 'src/app/store/training-history/training-history.selector';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'venko-training-history',
  templateUrl: './training-history.component.html',
  styleUrls: ['./training-history.component.scss'],
})
export class TrainingHistoryComponent implements OnInit {
  public environment = environment;
  public faChevronLeft = faChevronLeft;
  public faChevronRight = faChevronRight;
  public trainingHistoryIsLoading$: Observable<boolean>;
  public trainingHistory$: Observable<TrainingHistory>;
  public currentMonth: dayjs.Dayjs;

  constructor(
    private usersService: UsersService,
    private store: Store<AppState>,
    public utilsService: UtilsService,
  ) {
    this.currentMonth = dayjs().startOf('month');
  }

  ngOnInit(): void {
    this.usersService.currentUser$
      .pipe(filter(profile => profile?.email != null))
      .subscribe(profile =>
        this.store.dispatch(
          getTrainingHistoryForUser({
            email: profile.email,
            period: this.currentMonth.format('YYYY-MM-DD'),
          }),
        ),
      );

    this.trainingHistoryIsLoading$ = this.store.pipe(
      select(getTrainingHistoryIsLoading),
    );
    this.trainingHistory$ = this.store.pipe(select(getTrainingHistory));
  }

  public onLeftMonth(email: string) {
    this.currentMonth = this.currentMonth.add(-1, 'month');
    this.store.dispatch(
      getTrainingHistoryForUser({
        email: email,
        period: this.currentMonth.format('YYYY-MM-DD'),
      }),
    );
  }

  public onRightMonth(email: string) {
    this.currentMonth = this.currentMonth.add(1, 'month');
    this.store.dispatch(
      getTrainingHistoryForUser({
        email: email,
        period: this.currentMonth.format('YYYY-MM-DD'),
      }),
    );
  }
}
