import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users.service';
import { map } from 'rxjs/operators';
import { PublicRoutesService } from './public-routes.service';

@Injectable({
  providedIn: 'root',
})
export class VenkoUserGuard implements CanActivate {
  constructor(
    private router: Router,
    private usersService: UsersService,
    private publicRoutesService: PublicRoutesService,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | boolean {
    if (this.publicRoutesService.isPublicRoute(next)) {
      return true;
    }
    return this.usersService.currentUser$.pipe(
      map(profile => {
        if (profile.userId != null) {
          return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/']);
        return false;
      }),
    );
  }
}
