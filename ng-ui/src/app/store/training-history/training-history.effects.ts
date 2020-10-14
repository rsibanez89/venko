import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, exhaustMap, withLatestFrom, switchMap } from 'rxjs/operators';
import {
  addTrainingHistoryItem,
  deleteTrainingHistoryItem,
  editTrainingHistoryItem,
  getTrainingHistoryFailed,
  getTrainingHistoryForUser,
  getTrainingHistorySucceded,
} from './training-history.actions';
import { TrainingHistory } from './training-history.dto';
import { environment } from '../../../environments/environment';
import { AppState } from '../app/app.reducer';
import { getTrainingHistory } from './training-history.selector';

@Injectable()
export class TrainingHistoryEffects {
  constructor(private http: HttpClient, private action$: Actions, private store: Store<AppState>,) {}

  getTrainingHistory$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(getTrainingHistoryForUser),
      exhaustMap(param =>
        this.http
          .post(`${environment.api}/training-history/email`, {
            email: param.email,
            period: param.period,
          })
          .pipe(
            map((data: TrainingHistory) => {
              return getTrainingHistorySucceded({ data });
            }),
            catchError(err => {
              return of(getTrainingHistoryFailed({ error: err }));
            }),
          ),
      ),
    ),
  );

  addTrainingHistory$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(addTrainingHistoryItem, editTrainingHistoryItem, deleteTrainingHistoryItem),
      withLatestFrom(this.store.select(getTrainingHistory)),
      switchMap(([_, state]) =>
        this.http
          .post(`${environment.api}/training-history`, state)
          .pipe(
            map((data: TrainingHistory) => {
              return getTrainingHistorySucceded({ data });
            }),
            catchError(err => {
              return of(getTrainingHistoryFailed({ error: err }));
            }),
          ),
      ),
    ),
  );
}
