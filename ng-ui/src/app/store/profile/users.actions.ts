import { createAction, props } from '@ngrx/store';
import { Profile } from './profile.dto';

export const getAllUsers = createAction('[Users] Get users');
export const getAllUsersSucceded = createAction('[Users] Get users succeded', props<{ data: Profile[] }>());
export const getAllUsersFailed = createAction('[Users] Get users failed', props<{ error: Error }>());
