import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { AppState } from '../../store/app/app.reducer';
import {
  getProfileIsVenkoUser,
  getProfile,
  getProfileIsAdmin,
} from '../../store/profile/profile.selector';
import { Profile } from '../../store/profile/profile.dto';
import { AuthService } from './auth.service';
import {
  getProfileByEmail,
  getProfileFailed,
  getOrCreateProfile,
  getOrCreateProfileSucceded,
} from '../../store/profile/profile.actions';
import { Actions, ofType } from '@ngrx/effects';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public isVenkoUser$: Observable<boolean>;
  public isAdmin$: Observable<boolean>;
  public currentUser$: Observable<Profile>;

  constructor(
    public auth: AuthService,
    private store: Store<AppState>,
    private actions$: Actions,
  ) {
    // Load user profile when user signs in
    this.auth.userProfile$.subscribe(profile => {
      if (profile) {
        const venkoProfile: Profile = {
          userId: '10',
          fullName: profile.name,
          firstName: profile.given_name,
          lastName: profile.family_name,
          avatarUrl: profile.picture,
          nickName: profile.nickname,
          userType: 'User',
          email: profile.email,
        };
        this.store.dispatch(getOrCreateProfile({ data: venkoProfile }));
      }
    });

    this.isVenkoUser$ = this.store.pipe(select(getProfileIsVenkoUser));
    this.isAdmin$ = this.store.pipe(select(getProfileIsAdmin));
    this.currentUser$ = this.store.pipe(select(getProfile));
  }
}
