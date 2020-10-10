import { ActionReducerMap } from '@ngrx/store';
import { ProfileState, profileReducer } from '../profile/profile.reducer';
import { UsersState, usersReducer } from '../profile/users.reducer';
import { RoutinesState, routinesReducer } from '../routines/routines.reducer';
import {
  trainingHistoryReducer,
  TrainingHistoryState,
} from '../training-history/training-history.reducer';

export interface AppState {
  profile: ProfileState;
  users: UsersState;
  routines: RoutinesState;
  trainingHistory: TrainingHistoryState;
}

export const reducers: ActionReducerMap<AppState> = {
  profile: profileReducer,
  users: usersReducer,
  routines: routinesReducer,
  trainingHistory: trainingHistoryReducer,
};
