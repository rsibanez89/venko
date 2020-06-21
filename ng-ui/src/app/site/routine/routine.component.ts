import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { AppState } from '../../store/app/app.reducer';
import { getRoutineById } from '../../store/routines/routines.actions';
import { Observable } from 'rxjs';
import {
  getRoutinesIsLoading,
  getSelectedRoutine,
} from '../../store/routines/routines.selector';
import { environment } from '../../../environments/environment';
import { Exercise } from '../../store/routines/routines.dto';


@Component({
  selector: 'venko-routine',
  templateUrl: './routine.component.html',
  styleUrls: ['./routine.component.scss'],
  providers: [NgbCarouselConfig]
})
export class RoutineComponent implements OnInit {
  public environment = environment;
  public routineIsLoading$: Observable<boolean>;
  public exercises$: Observable<Exercise[]>;

  constructor(private route: ActivatedRoute, private store: Store<AppState>, config: NgbCarouselConfig) {
    config.interval = 1000 * 30; // 30 seconds interval.
  }

  ngOnInit(): void {
    this.route.params.subscribe(p =>
      this.store.dispatch(getRoutineById({ routineId: p.routineId })),
    );

    this.routineIsLoading$ = this.store.pipe(select(getRoutinesIsLoading));
    this.exercises$ = this.store.pipe(select(getSelectedRoutine));
  }
}
