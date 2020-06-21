import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../store/app/app.reducer';
import { getRoutinesForUser } from '../../store/routines/routines.actions';
import { Observable } from 'rxjs';
import {
  getRoutinesIsLoading,
  getRoutines,
} from '../../store/routines/routines.selector';
import { UsersService } from '../../shared/services/users.service';
import { environment } from '../../../environments/environment';
import { RoutineSummary } from '../../store/routines/routines.dto';

@Component({
  selector: 'venko-routines',
  templateUrl: './routines.component.html',
  styleUrls: ['./routines.component.scss'],
})
export class RoutinesComponent implements OnInit {
  public environment = environment;
  public routinesIsLoading$: Observable<boolean>;
  public routines$: Observable<RoutineSummary[]>;

  constructor(
    private usersService: UsersService,
    private store: Store<AppState>,
  ) {}

  ngOnInit(): void {
    this.usersService.currentUser$.subscribe(profile =>
      this.store.dispatch(getRoutinesForUser({ userId: profile.userId })),
    );
    // Uncomment for testing
    // this.store.dispatch(getRoutinesForUser({ userId: '10' }));

    this.routinesIsLoading$ = this.store.pipe(select(getRoutinesIsLoading));
    this.routines$ = this.store.pipe(select(getRoutines));
  }
}
