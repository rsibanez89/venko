import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  faCalendarAlt
} from '@fortawesome/free-solid-svg-icons';
import { NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../environments/environment';
import {
  Mood,
  TrainingHistory,
  TrainingHistoryItem,
  TrainingType,
} from '../../../app/store/training-history/training-history.dto';

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
  @ViewChild(NgbDatepicker) datePicker: NgbDatepicker;

  @Input()
  trainingHistory: TrainingHistory;

  @Input()
  set item(item: TrainingHistoryItem) {
    if (item == null) {
      item = new TrainingHistoryItem();
    }
    this._item = item;
    this.form.setValue({
      date: item.date || '',
      routineId: item.routineId || '',
      routineType: item.routineType || 'Fire',
      lapsCount: item.lapsCount || 0,
      dificulty: item.dificulty || 'Easy',
      duration: item.duration || '',
      weight: item.weight || '',
      comments: item.comments || '',
      energyLevel: item.energyLevel || 5,
      mood: item.mood || Mood.Awesome
    });
  }
  get item() {
    return this._item;
  }

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      date: ['', [Validators.required]],
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

  ngOnInit(): void {
    this.datePicker.navigation = 'none';
  }

  onOkSaveTrainingHistory() {
    console.log(this._item);
  }
}
