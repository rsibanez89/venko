import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import * as dayjs from 'dayjs';
import { environment } from '../../../environments/environment';
import { AppState } from '../../../app/store/app/app.reducer';
import {
  TrainingHistory,
  TrainingHistoryItem,
  TrainingType,
} from '../../../app/store/training-history/training-history.dto';
import {
  addTrainingHistoryItem,
  editTrainingHistoryItem,
} from '../../../app/store/training-history/training-history.actions';

@Component({
  selector: 'venko-training-history-edit',
  templateUrl: './training-history-edit.component.html',
  styleUrls: ['./training-history-edit.component.scss'],
})
export class TrainingHistoryEditComponent {
  public faCalendarAlt = faCalendarAlt;
  public environment = environment;
  public TrainingType = TrainingType;
  public form: FormGroup;
  private _item: TrainingHistoryItem;

  @Input()
  trainingHistory: TrainingHistory;

  @Input()
  editIndex = -1;

  @Input()
  selectedMonth: dayjs.Dayjs;

  @Input()
  showAutoData = true;

  @Input()
  set item(item: TrainingHistoryItem) {
    if (item == null) {
      item = new TrainingHistoryItem();
    }
    this.setItem(item);
  }
  get item() {
    return this._item;
  }

  @Output()
  saved = new EventEmitter();

  get dateTime(): Date {
    const year = this.form.get('date').value?.year;
    const month = this.form.get('date').value?.month;
    const day = this.form.get('date').value?.day;
    const hours = this.form.get('time').value?.hour;
    const minutes = this.form.get('time').value?.minute;
    const seconds = this.form.get('time').value?.second;
    return new Date(`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`);
  }
  get routineId() {
    return this.form.get('routineId');
  }
  get duration(): string {
    const hours = ('0' + this.form.get('duration').value?.hour).slice(-2);
    const minutes = ('0' + this.form.get('duration').value?.minute).slice(-2);
    const seconds = ('0' + this.form.get('duration').value?.second).slice(-2);
    return `${hours}:${minutes}:${seconds}`;
  }

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
  ) {
    this.form = this.fb.group({
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
      routineId: ['', [Validators.required]],
      routineType: ['', [Validators.required]],
      lapsCount: ['', [Validators.required]],
      dificulty: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      weight: [''],
      comments: [''],
      energyLevel: ['', [Validators.required]],
      mood: ['', [Validators.required]],
    });
  }

  public setItem(item: TrainingHistoryItem) {
    this._item = item;
    let newDate = new Date();
    if (this.selectedMonth.month() !== newDate.getMonth()) {
      newDate = new Date(this.selectedMonth.format('YYYY-MM-DD'));
    }
    const date = item.date != null ? new Date(item.date) : newDate;
    const time = item.date != null ? new Date(item.date) : new Date();
    const duration = item.duration || '00:20:00';
    this.form.setValue({
      date: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
      },
      time: {
        hour: time.getHours(),
        minute: time.getMinutes(),
        second: time.getSeconds(),
      },
      routineId: item.routineId || '',
      routineType: item.routineType || 'Fire',
      lapsCount: item.lapsCount || 4,
      dificulty: item.dificulty || 'Medium',
      duration: {
        hour: +duration.slice(0, 2),
        minute: +duration.slice(3, 5),
        second: +duration.slice(6, 8),
      },
      weight: item.weight || '',
      comments: item.comments || '',
      energyLevel: item.energyLevel || 5,
      mood: item.mood || 'Awesome',
    });
  }

  public getItem(): TrainingHistoryItem {
    return {
      date: this.dateTime,
      routineId: this.routineId.value,
      routineType: this.form.get('routineType').value,
      lapsCount: this.form.get('lapsCount').value,
      dificulty: this.form.get('dificulty').value,
      duration: this.duration,
      weight: this.form.get('weight').value === '' ? null : this.form.get('weight').value,
      comments: this.form.get('comments').value === '' ? null : this.form.get('comments').value,
      energyLevel: this.form.get('energyLevel').value,
      mood: this.form.get('mood').value,
    };
  }

  onOkSaveTrainingHistory() {
    if (this.editIndex !== -1) {
      this.store.dispatch(
        editTrainingHistoryItem({
          item: this.getItem(),
          index: this.editIndex,
        }),
      );
    } else {
      this.store.dispatch(addTrainingHistoryItem({ item: this.getItem() }));
    }
    this.saved.emit(true);
  }
}
