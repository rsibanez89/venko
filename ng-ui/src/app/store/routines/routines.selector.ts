import { createSelector } from '@ngrx/store';
import { AppState } from '../app/app.reducer';
import { RoutinesState } from './routines.reducer';

export const getRoutinesState = (state: AppState): RoutinesState =>
  state.routines;

export const getRoutinesIsLoading = createSelector(
  getRoutinesState,
  (state: RoutinesState) => state.isLoading,
);

export const getRoutines = createSelector(
  getRoutinesState,
  (state: RoutinesState) => state.routines,
);

export const getSelectedRoutine = createSelector(
  getRoutinesState,
  (state: RoutinesState) => state.exercises,
);
