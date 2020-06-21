import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, exhaustMap } from 'rxjs/operators';
import {
  getRoutinesForUser,
  getRoutineSucceded,
  getRoutinesSucceded,
  getRoutineById,
  getRoutinesFailed,
  getRoutineFailed,
} from './routines.actions';
import { Exercise, RoutineSummary } from './routines.dto';
import { environment } from '../../../environments/environment';

@Injectable()
export class RoutinesEffects {
  constructor(private http: HttpClient, private action$: Actions) {}

  getRoutines$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(getRoutinesForUser),
      exhaustMap(param =>
        this.http.get(`${environment.api}/${param.userId}/routines`).pipe(
          map((data: RoutineSummary[]) => {
            console.log(data);
            return getRoutinesSucceded({ data });
          }),
          catchError(err => {
            return of(getRoutinesFailed({ error: err }));
          }),
        ),
      ),
    ),
  );

  getRoutine$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(getRoutineById),
      exhaustMap(param =>
        this.http.get(`${environment.api}/routines/${param.routineId}`).pipe(
          map((data: Exercise[]) => {
            return getRoutineSucceded({ routineId: param.routineId, data });
          }),
          catchError(err => {
            return of(getRoutineFailed({ error: err }));
          }),
        ),
      ),
    ),
  );
}
