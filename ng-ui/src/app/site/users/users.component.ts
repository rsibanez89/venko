import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AppState } from '../../store/app/app.reducer';
import { Profile } from '../../store/profile/profile.dto';
import {
  getAllUsers,
  deleteUser,
  updateUser,
} from '../../store/profile/users.actions';
import {
  getUsersIsLoading,
  getUsers,
} from '../../store/profile/users.selector';

@Component({
  selector: 'venko-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  public environment = environment;
  public usersIsLoading$: Observable<boolean>;
  public users$: Observable<Profile[]>;
  public tableForm: FormGroup;
  public usersListForm: FormArray;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.initializeForm();
    this.store.dispatch(getAllUsers());
    this.usersIsLoading$ = this.store.pipe(select(getUsersIsLoading));
    this.users$ = this.store.pipe(select(getUsers));
    this.users$.pipe(filter(users => users != null)).subscribe(users => {
      // If the user list change, refresh the form
      this.initializeForm();

      users.forEach(user => {
        this.usersListForm.push(this.getuserFormGroup(user));
      });
    });
  }

  initializeForm() {
    this.usersListForm = this.fb.array([]);
    this.tableForm = this.fb.group({
      usersListForm: this.usersListForm,
    });
  }

  getuserFormGroup(user: Profile): FormGroup {
    return this.fb.group({
      userId: [user.userId, [Validators.required]],
      fullName: [user.fullName, [Validators.required]],
      firstName: [user.firstName, [Validators.required]],
      lastName: [user.lastName, [Validators.required]],
      avatarUrl: [user.avatarUrl, [Validators.required]],
      nickName: [user.nickName, [Validators.required]],
      userType: [user.userType, [Validators.required]],
      email: [user.email, [Validators.required]],
    });
  }

  deleteUser(index: number) {
    const user = this.usersListForm.controls[index].value;
    this.store.dispatch(deleteUser({ data: user }));
  }

  updateUser(index: number) {
    const user = this.usersListForm.controls[index].value;
    this.store.dispatch(updateUser({ data: user }));
  }
}
