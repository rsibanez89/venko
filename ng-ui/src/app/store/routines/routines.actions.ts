import { createAction, props } from '@ngrx/store';
import { Exercise, RoutineSummary } from './routines.dto';
import { HttpErrorResponse } from '@angular/common/http';

export const getRoutinesForUser = createAction('[Routines] Get routines for user', props<{ userId: string }>());
export const getRoutinesSucceded = createAction('[Routines] Get routines succeded', props<{ data: RoutineSummary[] }>());
export const getRoutinesFailed = createAction('[Routines] Get routines failed', props<{ error: HttpErrorResponse }>());

export const getRoutineById = createAction('[Routines] Get routine by Id', props<{ routineId: string }>());
export const getRoutineSucceded = createAction('[Routines] Get routine succeded', props<{ routineId: string, data: Exercise[] }>());
export const getRoutineFailed = createAction('[Routines] Get routine failed', props<{ error: HttpErrorResponse }>());
