import { createAction, props } from '@ngrx/store';
import { Profile } from './profile.dto';

export const getAllUsers = createAction('[Users] Get users');
export const getAllUsersSucceded = createAction('[Users] Get users succeded', props<{ data: Profile[] }>());
export const getAllUsersFailed = createAction('[Users] Get users failed', props<{ error: Error }>());

export const deleteUser = createAction('[Users] Delete user', props<{ data: Profile }>());
export const deleteUserSucceded = createAction('[Users] Delete user succeded', props<{ data: Profile }>());
export const deleteUserFailed = createAction('[Users] Delete user failed', props<{ error: Error }>());

export const updateUser = createAction('[Users] Update user', props<{ data: Profile }>());
export const updateUserSucceded = createAction('[Users] Update user succeded', props<{ data: Profile }>());
export const updateUserFailed = createAction('[Users] Update user failed', props<{ error: Error }>());
