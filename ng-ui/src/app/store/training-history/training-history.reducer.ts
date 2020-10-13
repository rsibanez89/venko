import { createReducer, on, Action } from '@ngrx/store';
import {
  getTrainingHistoryForUser,
  getTrainingHistorySucceded,
  getTrainingHistoryFailed,
  addTrainingHistoryItem,
  deleteTrainingHistoryItem,
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
    return { ...state, trainingHistory: action.data, isLoading: false };
  }),
  on(getTrainingHistoryFailed, state => {
    return { ...state, isLoading: false };
  }),
  on(addTrainingHistoryItem, (state, action) => {
    const newTH = {
      ...state.trainingHistory,
      items: [...state.trainingHistory.items, action.item],
    };
    console.log(action.item);
    return { ...state, trainingHistory: newTH, isLoading: false };
  }),
  on(deleteTrainingHistoryItem, (state, action) => {
    const newTH = {
      ...state.trainingHistory,
      items: [...state.trainingHistory.items],
    };
    newTH.items.splice(action.index, 1);
    return { ...state, trainingHistory: newTH, isLoading: false };
  }),
);

export function trainingHistoryReducer(
  state: TrainingHistoryState,
  action: Action,
) {
  return _trainingHistoryReducer(state, action);
}
