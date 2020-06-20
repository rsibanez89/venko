import { createSelector } from '@ngrx/store';
import { AppState } from '../app/app.reducer';
import { ProfileState } from './profile.reducer';

export const getProfileState = (state: AppState): ProfileState => state.profile;

export const getProfileIsLoading = createSelector(
  getProfileState,
  (state: ProfileState) => state.isLoading
);

export const getProfile = createSelector(
  getProfileState,
  (state: ProfileState) => state
);

export const getProfileIsVenkoUser = createSelector(
  getProfileState,
  (state: ProfileState) => state.userId != null
);
