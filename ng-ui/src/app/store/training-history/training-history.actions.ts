import { createAction, props } from '@ngrx/store';
import { TrainingHistory, TrainingHistoryItem } from './training-history.dto';
import { HttpErrorResponse } from '@angular/common/http';

export const getTrainingHistoryForUser = createAction(
  '[TrainingHistory] Get training history for user',
  props<{ email: string, period: string }>(),
);
export const getTrainingHistorySucceded = createAction(
  '[TrainingHistory] Get training history succeded',
  props<{ data: TrainingHistory }>(),
);
export const getTrainingHistoryFailed = createAction(
  '[TrainingHistory] Get training history failed',
  props<{ error: HttpErrorResponse }>(),
);

export const addTrainingHistoryItem = createAction(
  '[TrainingHistory] Add training history item',
  props<{ item: TrainingHistoryItem }>(),
);
export const deleteTrainingHistoryItem = createAction(
  '[TrainingHistory] Delete training history succeded',
  props<{ index: number }>(),
);
export const editTrainingHistoryItem = createAction(
  '[TrainingHistory] Edit training history item',
  props<{ item: TrainingHistoryItem, index: number }>(),
);

