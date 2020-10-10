import { createReducer, on, Action } from '@ngrx/store';
import {
  getTrainingHistoryForUser,
  getTrainingHistorySucceded,
  getTrainingHistoryFailed,
} from './training-history.actions';
import { TrainingHistory } from './training-history.dto';

export interface TrainingHistoryState {
  trainingHistory: TrainingHistory;
  isLoading: boolean;
}

export const initialState: TrainingHistoryState = {
  trainingHistory: null,
  isLoading: false,
};

const _trainingHistoryReducer = createReducer(
  initialState,
  on(getTrainingHistoryForUser, state => {
    return { ...state, trainingHistory: null, isLoading: true };
  }),
  on(getTrainingHistorySucceded, (state, action) => {
    console.log(action.data);
    return { ...state, trainingHistory: action.data, isLoading: false };
  }),
  on(getTrainingHistoryFailed, state => {
    return { ...state, isLoading: false };
  }),
);

export function trainingHistoryReducer(
  state: TrainingHistoryState,
  action: Action,
) {
  return _trainingHistoryReducer(state, action);
}
