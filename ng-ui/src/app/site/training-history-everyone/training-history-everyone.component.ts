import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  exhaustMap,
  filter,
  map,
  startWith,
  withLatestFrom,
} from 'rxjs/operators';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import * as dayjs from 'dayjs';
import { AppState } from '../../../app/store/app/app.reducer';
import { environment } from '../../../environments/environment';
import * as actions from 'src/app/store/training-history/training-history.actions';
import * as selectors from 'src/app/store/training-history/training-history.selector';
import { TrainingHistoryForPeriod } from 'src/app/store/training-history/training-history.dto';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'venko-training-history-everyone',
  templateUrl: './training-history-everyone.component.html',
  styleUrls: ['./training-history-everyone.component.scss'],
})
export class TrainingHistoryEveryoneComponent implements OnInit {
  public environment = environment;
  public faChevronLeft = faChevronLeft;
  public faChevronRight = faChevronRight;
  public trainingHistoryIsLoading$: Observable<boolean>;
  public trainingHistory$: Observable<TrainingHistoryForPeriod>;
  public selectedMonth: dayjs.Dayjs;
  public filter = new FormControl('');
  public filteredTrainingHistory$: Observable<TrainingHistoryForPeriod>;

  constructor(private store: Store<AppState>) {
    this.selectedMonth = dayjs().startOf('month');
  }

  ngOnInit(): void {
    this.store.dispatch(
      actions.getTrainingHistoryForPeriod({
        period: this.selectedMonth.format('YYYY-MM-DD'),
      }),
    );

    this.trainingHistoryIsLoading$ = this.store.pipe(
      select(selectors.getTrainingHistoryIsLoading),
    );
    this.trainingHistory$ = this.store.pipe(
      select(selectors.getTrainingHistoryForPeriod),
    );

    const searchString$ = this.filter.valueChanges.pipe(
      startWith(''), // start it off
      debounceTime(150), // debounce the user input
      distinctUntilChanged(),
    );

    this.filteredTrainingHistory$ = combineLatest([
      this.trainingHistory$,
      searchString$,
    ]).pipe(
      map(([trainingHistory, searchString]) => {
        if (searchString) {
          return this.search(trainingHistory, searchString)
        }
        return trainingHistory;
      }),
    );
  }

  search(
    trainings: TrainingHistoryForPeriod,
    text: string,
  ): TrainingHistoryForPeriod {
    const filtered = {
      period: trainings.period,
      items: trainings.items.filter(training => {
        const search = text.toLowerCase();
        return training.email.toLowerCase().includes(search);
      }),
    };

    return filtered;
  }

  public formatDate(date: string): string {
    return dayjs(date).format('YYYY-MM-DD');
  }

  public onLeftMonth() {
    this.selectedMonth = this.selectedMonth.add(-1, 'month');
    this.store.dispatch(
      actions.getTrainingHistoryForPeriod({
        period: this.selectedMonth.format('YYYY-MM-DD'),
      }),
    );
  }

  public onRightMonth() {
    this.selectedMonth = this.selectedMonth.add(1, 'month');
    this.store.dispatch(
      actions.getTrainingHistoryForPeriod({
        period: this.selectedMonth.format('YYYY-MM-DD'),
      }),
    );
  }
}
