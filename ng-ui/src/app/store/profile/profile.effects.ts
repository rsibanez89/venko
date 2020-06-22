import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, exhaustMap } from 'rxjs/operators';
import {
  getProfileByEmail,
  getProfileSucceded,
  getProfileFailed,
  saveProfile,
  saveProfileSucceded,
  saveProfileFailed,
} from './profile.actions';
import { Profile } from './profile.dto';
import { environment } from '../../../environments/environment';

@Injectable()
export class ProfileEffects {
  constructor(private http: HttpClient, private action$: Actions) {}

  getProfile$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(getProfileByEmail),
      exhaustMap(param =>
        this.http
          .post(`${environment.api}/users/email`, { email: param.email })
          .pipe(
            map((data: Profile) => {
              return getProfileSucceded({ data });
            }),
            catchError(err => {
              return of(getProfileFailed({ error: err }));
            }),
          ),
      ),
    ),
  );

  saveProfile$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(saveProfile),
      mergeMap(action =>
        this.http
          .post(`${environment.api}/users`, action.data, {
            headers: { 'Content-Type': 'application/json' },
          })
          .pipe(
            map((data: Profile) => {
              return saveProfileSucceded(data);
            }),
            catchError((error: HttpErrorResponse) => {
              return of(saveProfileFailed({ error }));
            }),
          ),
      ),
    ),
  );
}
