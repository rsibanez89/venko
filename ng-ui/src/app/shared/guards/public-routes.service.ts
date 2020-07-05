import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PublicRoutesService {
  public isPublicRoute(next: ActivatedRouteSnapshot): boolean {
    if (next.routeConfig.path !== 'routines/:routineId') {
      return false;
    }
    if (next.params.routineId === undefined) {
      return false;
    }
    return this.isPublicRoutine(next.params.routineId);
  }

  public isPublicRouteRequest(req: HttpRequest<any>) {
    if (req.url === undefined || req.url.indexOf('routines/') === -1) {
      return false;
    }

    const routineId = req.url.substring(
      req.url.indexOf('routines/') + 9,
      req.url.length,
    );

    return this.isPublicRoutine(routineId);
  }

  private isPublicRoutine(routineId: string): boolean {
    const publicRoutines = ['270', '275', '1429', '1431'];
    return publicRoutines.includes(routineId);
  }
}
