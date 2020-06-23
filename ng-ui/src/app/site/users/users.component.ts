import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AppState } from '../../store/app/app.reducer';
import { getAllUsers, deleteUser } from 'src/app/store/profile/users.actions';
import { getUsersIsLoading, getUsers } from 'src/app/store/profile/users.selector';
import { Profile } from 'src/app/store/profile/profile.dto';

@Component({
  selector: 'venko-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public environment = environment;
  public usersIsLoading$: Observable<boolean>;
  public users$: Observable<Profile[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(getAllUsers());

    this.usersIsLoading$ = this.store.pipe(select(getUsersIsLoading));
    this.users$ = this.store.pipe(select(getUsers));
  }

  deleteUser(user: Profile) {
    this.store.dispatch(deleteUser({ data: user }));
  }
}
