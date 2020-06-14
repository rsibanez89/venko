import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/app/app.reducer';
import {
  getProfileByEmail,
  saveProfile,
} from 'src/app/store/profile/profile.actions';
import { getProfile } from 'src/app/store/profile/profile.selector';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { filter } from 'rxjs/internal/operators/filter';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'venko-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public form: FormGroup;
  public environment = environment;

  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
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
        this.store.dispatch(getProfileByEmail({ email: profile.email }));
        this.form.setValue({
          userId: '',
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

    this.store
      .pipe(
        select(getProfile),
        filter(venkoProfile => venkoProfile?.userId !== ''),
      )
      .subscribe(venkoProfile => {
        this.form.get('userId').setValue(venkoProfile.userId);
      });
  }

  public onOkUpdateProfile(): void {
    this.store.dispatch(saveProfile({ data: this.form.getRawValue() }));
  }
}
