import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import * as dayjs from 'dayjs';
import { environment } from '../../../environments/environment';
import { AppState } from '../../../app/store/app/app.reducer';
import {
  Mood,
  TrainingHistory,
  TrainingHistoryItem,
  TrainingType,
} from '../../../app/store/training-history/training-history.dto';
import { addTrainingHistoryItem } from 'src/app/store/training-history/training-history.actions';

@Component({
  selector: 'venko-training-history-edit',
  templateUrl: './training-history-edit.component.html',
  styleUrls: ['./training-history-edit.component.scss'],
})
export class TrainingHistoryEditComponent implements OnInit {
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
  set item(item: TrainingHistoryItem) {
    if (item == null) {
      item = new TrainingHistoryItem();
    }
    this.setItem(item);
  }
  get item() {
    return this._item;
  }

  get dateTime(): Date {
    const year = this.form.get('date').value?.year;
    const month = this.form.get('date').value?.month;
    const day = this.form.get('date').value?.day;
    const hours = this.form.get('time').value?.hour;
    const minutes = this.form.get('time').value?.minute;
    const seconds = this.form.get('time').value?.second;
    console.log(year, month, day, hours, minutes, seconds, 0);
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

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
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

  ngOnInit(): void {}

  public setItem(item: TrainingHistoryItem) {
    this._item = item;
    const date = item.date != null ? new Date(item.date) : new Date();
    const duration = item.duration || '00:20:00';
    this.form.setValue({
      date: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
      },
      time: {
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds(),
      },
      routineId: item.routineId || '',
      routineType: item.routineType || 'Fire',
      lapsCount: item.lapsCount || 0,
      dificulty: item.dificulty || 'Easy',
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
      weight: this.form.get('weight').value,
      comments: this.form.get('comments').value,
      energyLevel: this.form.get('energyLevel').value,
      mood: this.form.get('mood').value,
    };
  }

  onOkSaveTrainingHistory() {
    this.store.dispatch(addTrainingHistoryItem({ item: this.getItem() }));
  }
}
