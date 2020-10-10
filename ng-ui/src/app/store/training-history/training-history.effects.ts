import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, exhaustMap } from 'rxjs/operators';
import {
  getTrainingHistoryFailed,
  getTrainingHistoryForUser,
  getTrainingHistorySucceded,
} from './training-history.actions';
import { TrainingHistory } from './training-history.dto';
import { environment } from '../../../environments/environment';

@Injectable()
export class TrainingHistoryEffects {
  constructor(private http: HttpClient, private action$: Actions) {}

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
              console.log(data);
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
