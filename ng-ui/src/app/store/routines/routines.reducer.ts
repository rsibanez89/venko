import { createReducer, on, Action } from '@ngrx/store';
import {
  getRoutinesForUser,
  getRoutinesSucceded,
  getRoutinesFailed,
  getRoutineById,
  getRoutineSucceded,
  getRoutineFailed,
} from './routines.actions';
import { RoutineSummary, Exercise } from './routines.dto';

export interface RoutinesState {
  routines: RoutineSummary[];
  exercises: Exercise[];
  selected: string;
  isLoading: boolean;
}

export const initialState: RoutinesState = {
  routines: [],
  exercises: [],
  selected: null,
  isLoading: false,
};

const _routinesReducer = createReducer(
  initialState,
  on(getRoutinesForUser, state => {
    return { ...state, selected: null, exercises: [], isLoading: true };
  }),
  on(getRoutinesSucceded, (state, action) => {
    return { ...state, routines: action.data, isLoading: false };
  }),
  on(getRoutinesFailed, state => {
    return { ...state, isLoading: false };
  }),

  on(getRoutineById, state => {
    return { ...state, isLoading: true };
  }),
  on(getRoutineSucceded, (state, action) => {
    return { ...state, selected: action.routineId, exercises: action.data, isLoading: false };
  }),
  on(getRoutineFailed, state => {
    return { ...state, isLoading: false };
  }),
);

export function routinesReducer(state: RoutinesState, action: Action) {
  return _routinesReducer(state, action);
}
