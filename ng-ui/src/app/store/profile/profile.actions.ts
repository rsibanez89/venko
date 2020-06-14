import { createAction, props } from '@ngrx/store';
import { Profile } from './profile.dto';
import { HttpErrorResponse } from '@angular/common/http';

export const getProfileByEmail = createAction('[Profile] Get profile by email', props<{ email: string }>());
export const getProfileSucceded = createAction('[Profile] Get profile succeded', props<{ data: Profile }>());
export const getProfileFailed = createAction('[Profile] Get profile failed', props<{ error: Error }>());

export const saveProfile = createAction('[Profile] Save profile', props<{ data: Profile }>());
export const saveProfileSucceded = createAction('[Profile] Save profile succeded');
export const saveProfileFailed = createAction('[Profile] Save profile failed', props<{ error: HttpErrorResponse }>());
