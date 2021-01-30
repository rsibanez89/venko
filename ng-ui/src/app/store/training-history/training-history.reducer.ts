import { createReducer, on, Action } from '@ngrx/store';
import {
  getTrainingHistoryForUser,
  getTrainingHistorySucceded,
  getTrainingHistoryFailed,
  addTrainingHistoryItem,
  deleteTrainingHistoryItem,
  editTrainingHistoryItem,
  getTrainingHistoryForPeriod,
  getTrainingHistoryForPeriodSucceded,
  getTrainingHistoryForPeriodFailed,
} from './training-history.actions';
import { TrainingHistory, TrainingHistoryForPeriod } from './training-history.dto';

export interface TrainingHistoryState {
  trainingHistory: TrainingHistory;
  trainingHistoryForPeriod: TrainingHistoryForPeriod;
  isLoading: boolean;
}

export const initialState: TrainingHistoryState = {
  trainingHistory: null,
  trainingHistoryForPeriod: null,
  isLoading: false,
};

function emptyTrainingHistory(action): TrainingHistory {
  return {
    email: action.email,
    period: action.period,
    items: [],
  } as TrainingHistory;
}

function emptyTrainingHistoryForPeriod(action): TrainingHistoryForPeriod {
  return {
    period: action.period,
    items: [],
  } as TrainingHistoryForPeriod;
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
  on(getTrainingHistoryForPeriod, (state, action) => {
    return {
      ...state,
      trainingHistoryForPeriod: emptyTrainingHistoryForPeriod(action),
      isLoading: true,
    };
  }),
  on(getTrainingHistoryForPeriodSucceded, (state, action) => {
    return { ...state, trainingHistoryForPeriod: action.data, isLoading: false };
  }),
  on(getTrainingHistoryForPeriodFailed, state => {
    return { ...state, isLoading: false };
  }),
);

export function trainingHistoryReducer(
  state: TrainingHistoryState,
  action: Action,
) {
  return _trainingHistoryReducer(state, action);
}
