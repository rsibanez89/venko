import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/app/app.reducer';
import {
  getProfileIsVenkoUser,
  getProfile,
} from '../../store/profile/profile.selector';
import { Profile } from '../../store/profile/profile.dto';
import { AuthService } from './auth.service';
import { getProfileByEmail } from '../../store/profile/profile.actions';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public isVenkoUser$: Observable<boolean>;
  public currentUser$: Observable<Profile>;
  public currentUser: Profile;

  constructor(public auth: AuthService, private store: Store<AppState>) {
    // Load user profile when user signs in
    this.auth.userProfile$.subscribe(profile => {
      if (profile) {
        this.store.dispatch(getProfileByEmail({ email: profile.email }));
      }
    });
    this.currentUser = null;
    this.isVenkoUser$ = this.store.pipe(select(getProfileIsVenkoUser));
    this.currentUser$ = this.store.pipe(select(getProfile));
    this.currentUser$.subscribe(profile => (this.currentUser = profile));
  }
}
