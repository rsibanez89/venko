import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as dayjs from 'dayjs';
import { AppState } from '../../../app/store/app/app.reducer';
import { environment } from '../../../environments/environment';
import { UsersService } from '../../../app/shared/services/users.service';
import {
  TrainingHistory,
  TrainingHistoryItem,
} from '../../../app/store/training-history/training-history.dto';
import {
  deleteTrainingHistoryItem,
  getTrainingHistoryForUser,
} from '../../../app/store/training-history/training-history.actions';
import {
  getTrainingHistory,
  getTrainingHistoryIsLoading,
} from 'src/app/store/training-history/training-history.selector';

@Component({
  selector: 'venko-training-history',
  templateUrl: './training-history.component.html',
  styleUrls: ['./training-history.component.scss'],
})
export class TrainingHistoryComponent implements OnInit {
  public environment = environment;
  public faChevronLeft = faChevronLeft;
  public faChevronRight = faChevronRight;
  public trainingHistoryIsLoading$: Observable<boolean>;
  public trainingHistory$: Observable<TrainingHistory>;
  public selectedMonth: dayjs.Dayjs;
  public selectedItem: TrainingHistoryItem;
  public selectedItemIndex: number;
  private userEmail: string;

  constructor(
    private usersService: UsersService,
    private store: Store<AppState>,
    private modalService: NgbModal,
  ) {
    this.selectedMonth = dayjs().startOf('month');
  }

  ngOnInit(): void {
    this.usersService.currentUser$
      .pipe(filter(profile => profile?.email != null))
      .subscribe(profile =>
        {
          this.userEmail = profile.email;
          this.store.dispatch(
            getTrainingHistoryForUser({
              email: profile.email,
              period: this.selectedMonth.format('YYYY-MM-DD'),
            }));
        },
      );

    this.trainingHistoryIsLoading$ = this.store.pipe(
      select(getTrainingHistoryIsLoading),
    );
    this.trainingHistory$ = this.store.pipe(select(getTrainingHistory));
  }

  public formatDate(date: string): string {
    return dayjs(date).format('YYYY-MM-DD');
  }

  public onLeftMonth() {
    this.selectedMonth = this.selectedMonth.add(-1, 'month');
    this.store.dispatch(
      getTrainingHistoryForUser({
        email: this.userEmail,
        period: this.selectedMonth.format('YYYY-MM-DD'),
      }),
    );
  }

  public onRightMonth() {
    this.selectedMonth = this.selectedMonth.add(1, 'month');
    this.store.dispatch(
      getTrainingHistoryForUser({
        email: this.userEmail,
        period: this.selectedMonth.format('YYYY-MM-DD'),
      }),
    );
  }

  public onCloseModal() {
    this.modalService.dismissAll();
  }

  public onUpdateItem(modalContent, item: TrainingHistoryItem, index: number) {
    this.selectedItem = item;
    this.selectedItemIndex = index;

    this.modalService.open(modalContent, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
    });
  }

  public onAddItem(modalContent) {
    this.selectedItem = null;
    this.selectedItemIndex = -1;
    console.log(this.selectedMonth);

    this.modalService.open(modalContent, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
    });
  }

  public onDeleteItem(index: number) {
    this.store.dispatch(deleteTrainingHistoryItem({ index }));
  }
}
