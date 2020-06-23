import { createAction, props } from '@ngrx/store';
import { Profile } from './profile.dto';
import { HttpErrorResponse } from '@angular/common/http';

export const getProfileByEmail = createAction('[Profile] Get profile by email', props<{ email: string }>());
export const getProfileSucceded = createAction('[Profile] Get profile succeded', props<{ data: Profile }>());
export const getProfileFailed = createAction('[Profile] Get profile failed', props<{ error: Error }>());

export const getOrCreateProfile = createAction('[Profile] Get or create profile', props<{ data: Profile }>());
export const getOrCreateProfileSucceded = createAction('[Profile] Get or create profile succeded', props<{ data: Profile }>());
export const getOrCreateProfileFailed = createAction('[Profile] Get or create profile failed', props<{ error: HttpErrorResponse }>());
