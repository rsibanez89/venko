import { createReducer, on, Action } from '@ngrx/store';
import {
  getProfileByEmail,
  getProfileSucceded,
  getProfileFailed,
  saveProfile,
  saveProfileSucceded,
  saveProfileFailed,
} from './profile.actions';
import { Profile } from './profile.dto';

export interface ProfileState extends Profile {
  isLoading: boolean;
}

export const initialState: ProfileState = {
  userId: null,
  fullName: null,
  firstName: null,
  lastName: null,
  avatarUrl: null,
  nickName: null,
  userType: null,
  email: null,
  isLoading: false,
};

const _profileReducer = createReducer(
  initialState,
  on(getProfileByEmail, state => {
    return { ...state, isLoading: true };
  }),
  on(getProfileSucceded, (state, action) => {
    return { ...action.data, isLoading: false };
  }),
  on(getProfileFailed, state => {
    return { ...state, isLoading: false };
  }),

  on(saveProfile, state => {
    return { ...state, isLoading: true };
  }),
  on(saveProfileSucceded, state => {
    return { ...state, isLoading: false };
  }),
  on(saveProfileFailed, state => {
    return { ...state, isLoading: false };
  }),
);

export function profileReducer(state: ProfileState, action: Action) {
  return _profileReducer(state, action);
}
