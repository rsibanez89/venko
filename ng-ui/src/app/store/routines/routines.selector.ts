import { createSelector } from '@ngrx/store';
import { stringify } from 'querystring';
import { AppState } from '../app/app.reducer';
import { RoutineSummary } from './routines.dto';
import { RoutinesState } from './routines.reducer';

export const getRoutinesState = (state: AppState): RoutinesState =>
  state.routines;

export const getRoutinesIsLoading = createSelector(
  getRoutinesState,
  (state: RoutinesState) => state.isLoading,
);

export const getRoutines = createSelector(
  getRoutinesState,
  (state: RoutinesState) => state.routines,
);

export const getSelectedRoutine = createSelector(
  getRoutinesState,
  (state: RoutinesState) => state.exercises,
);

export const getSelectedRoutineId = createSelector(
  getRoutinesState,
  (state: RoutinesState) => state.selected,
);

export const getSelectedRoutineType = createSelector(
  getRoutines,
  getSelectedRoutineId,
  (routines: RoutineSummary[], id: string) => {
    const routine = routines.find(r => +r.id === +id);
    if (routine == null) {
      return null;
    }
    switch (routine.name.toLocaleLowerCase().trim()) {
      case 'Venko Running'.toLocaleLowerCase():
        return 'Running';
      case 'Mejora tu estado.'.toLocaleLowerCase():
        return 'Burn';
      case 'Alta intensidad'.toLocaleLowerCase():
        return 'Fire';
      case 'Tonifica todo tu cuerpo.'.toLocaleLowerCase():
        return 'Strong';
      case 'Mejora tu fuerza.'.toLocaleLowerCase():
        return 'Powerfull';
      case 'Entrena tus abdominales.'.toLocaleLowerCase():
        return 'ByeByePaunch';
      case 'Movilidad articular'.toLocaleLowerCase():
        return 'Mobility';
      case 'Flexibilidad'.toLocaleLowerCase():
        return 'Flexibility';
      default:
        return 'Flexibility';
    }
  },
);
