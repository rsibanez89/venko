import { createSelector } from '@ngrx/store';
import { AppState } from '../app/app.reducer';
import { UsersState } from './users.reducer';

export const getUsersState = (state: AppState): UsersState => state.users;

export const getUsersIsLoading = createSelector(
  getUsersState,
  (state: UsersState) => state.isLoading
);

export const getUsers = createSelector(
  getUsersState,
  (state: UsersState) => state.users
);
