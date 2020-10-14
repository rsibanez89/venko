import { createReducer, on, Action } from '@ngrx/store';
import {
  getTrainingHistoryForUser,
  getTrainingHistorySucceded,
  getTrainingHistoryFailed,
  addTrainingHistoryItem,
  deleteTrainingHistoryItem,
  editTrainingHistoryItem,
} from './training-history.actions';
import { TrainingHistory, TrainingHistoryItem } from './training-history.dto';

export interface TrainingHistoryState {
  trainingHistory: TrainingHistory;
  isLoading: boolean;
}

export const initialState: TrainingHistoryState = {
  trainingHistory: null,
  isLoading: false,
};

function emptyTrainingHistory(action): TrainingHistory {
  return {
    email: action.email,
    period: action.period,
    items: [],
  } as TrainingHistory;
}

const _trainingHistoryReducer = createReducer(
  initialState,
  on(getTrainingHistoryForUser, (state, action) => {
    return {
      ...state,
      trainingHistory: emptyTrainingHistory(action),
      isLoading: true,
    };
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
  on(editTrainingHistoryItem, (state, action) => {
    const newTH = {
      ...state.trainingHistory,
      items: [...state.trainingHistory.items],
    };
    newTH.items.splice(action.index, 1);
    newTH.items.splice(action.index, 0, action.item);
    return { ...state, trainingHistory: newTH, isLoading: false };
  }),
);

export function trainingHistoryReducer(
  state: TrainingHistoryState,
  action: Action,
) {
  return _trainingHistoryReducer(state, action);
}
