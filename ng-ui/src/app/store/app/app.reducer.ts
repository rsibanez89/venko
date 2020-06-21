import { ProfileState, profileReducer } from '../profile/profile.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { RoutinesState, routinesReducer } from '../routines/routines.reducer';

export interface AppState {
  profile: ProfileState;
  routines: RoutinesState;
}

export const reducers: ActionReducerMap<AppState> = {
  profile: profileReducer,
  routines: routinesReducer,
};
