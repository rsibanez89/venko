import { ProfileState, profileReducer } from '../profile/profile.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  profile: ProfileState;
}

export const reducers: ActionReducerMap<AppState> = {
  profile: profileReducer,
};
