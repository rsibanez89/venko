import { createReducer, on, Action } from '@ngrx/store';
import {
  getAllUsers,
  getAllUsersSucceded,
  getAllUsersFailed,
  deleteUser,
  deleteUserSucceded,
  deleteUserFailed,
  updateUser,
  updateUserSucceded,
  updateUserFailed,
  selectUser,
} from './users.actions';
import { Users, Profile } from './profile.dto';

export interface UsersState extends Users {
  selectedUser: Profile;
  isLoading: boolean;
}

export const initialState: UsersState = {
  users: null,
  selectedUser: null,
  isLoading: false,
};

const _usersReducer = createReducer(
  initialState,
  on(getAllUsers, state => {
    return { ...state, isLoading: true };
  }),
  on(getAllUsersSucceded, (state, action) => {
    return { ...state, users: action.data, isLoading: false };
  }),
  on(getAllUsersFailed, state => {
    return { ...state, isLoading: false };
  }),

  on(deleteUser, state => {
    return { ...state, isLoading: true };
  }),
  on(deleteUserSucceded, (state, action) => {
    return {
      ...state,
      users: state.users.filter(u => u.email !== action.data.email),
      isLoading: false,
    };
  }),
  on(deleteUserFailed, state => {
    return { ...state, isLoading: false };
  }),

  on(updateUser, state => {
    return { ...state, isLoading: true };
  }),
  on(updateUserSucceded, (state, action) => {
    return {
      ...state,
      users: state.users
        .filter(u => u.email !== action.data.email)
        .concat(action.data),
      isLoading: false,
    };
  }),
  on(updateUserFailed, state => {
    return { ...state, isLoading: false };
  }),
  on(selectUser, (state, action) => {
    return { ...state, selectedUser: action.data, isLoading: false };
  }),
);

export function usersReducer(state: UsersState, action: Action) {
  return _usersReducer(state, action);
}
