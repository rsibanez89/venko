import { createSelector } from '@ngrx/store';
import { AppState } from '../app/app.reducer';
import { TrainingHistoryState } from './training-history.reducer';

export const getTrainingHistoryState = (state: AppState): TrainingHistoryState =>
  state.trainingHistory;

export const getTrainingHistoryIsLoading = createSelector(
  getTrainingHistoryState,
  (state: TrainingHistoryState) => state.isLoading,
);

export const getTrainingHistory = createSelector(
  getTrainingHistoryState,
  (state: TrainingHistoryState) => state.trainingHistory,
);
