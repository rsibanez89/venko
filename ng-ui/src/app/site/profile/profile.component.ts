import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/app/app.reducer';
import {
  saveProfile,
} from 'src/app/store/profile/profile.actions';
import { getProfile, getProfileIsLoading } from 'src/app/store/profile/profile.selector';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { filter } from 'rxjs/internal/operators/filter';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'venko-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public form: FormGroup;
  public environment = environment;
  public profileIsLoading$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
    public usersService: UsersService,
    private store: Store<AppState>,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      userId: ['', [Validators.required]],
      fullName: [{ value: '', disabled: true }, [Validators.required]],
      firstName: [{ value: '', disabled: true }, [Validators.required]],
      lastName: [{ value: '', disabled: true }, [Validators.required]],
      avatarUrl: [{ value: '', disabled: true }, [Validators.required]],
      nickName: [{ value: '', disabled: true }, [Validators.required]],
      userType: [{ value: '', disabled: true }, [Validators.required]],
      email: [{ value: '', disabled: true }, [Validators.required]],
    });

    this.auth.userProfile$.subscribe(profile => {
      if (profile) {
        this.form.setValue({
          userId: null,
          fullName: profile.name,
          firstName: profile.given_name,
          lastName: profile.family_name,
          avatarUrl: profile.picture,
          nickName: profile.nickname,
          userType: 'User',
          email: profile.email,
        });
      }
    });

    this.profileIsLoading$ = this.store.pipe(select(getProfileIsLoading));

    this.store
      .pipe(
        select(getProfile),
        filter(venkoProfile => venkoProfile.userId != null),
      )
      .subscribe(venkoProfile => {
        this.form.get('userId').setValue(venkoProfile.userId);
      });
  }

  public onOkUpdateProfile(): void {
    this.store.dispatch(saveProfile({ data: this.form.getRawValue() }));
  }
}
