import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, exhaustMap } from 'rxjs/operators';
import { Profile } from './profile.dto';
import { environment } from '../../../environments/environment';
import {
  getAllUsers,
  getAllUsersSucceded,
  getAllUsersFailed,
  deleteUser,
  deleteUserFailed,
  deleteUserSucceded,
} from './users.actions';

@Injectable()
export class UsersEffects {
  constructor(private http: HttpClient, private action$: Actions) {}

  getUsers$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(getAllUsers),
      exhaustMap(() =>
        this.http.get(`${environment.api}/users`).pipe(
          map((data: Profile[]) => {
            return getAllUsersSucceded({ data });
          }),
          catchError(err => {
            return of(getAllUsersFailed({ error: err }));
          }),
        ),
      ),
    ),
  );

  deleteUser$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(deleteUser),
      exhaustMap((param) =>
        this.http.delete(`${environment.api}/users/${param.data.userId}`).pipe(
          map((data: Profile) => {
            return deleteUserSucceded({ data });
          }),
          catchError(err => {
            return of(deleteUserFailed({ error: err }));
          }),
        ),
      ),
    ),
  );
}
