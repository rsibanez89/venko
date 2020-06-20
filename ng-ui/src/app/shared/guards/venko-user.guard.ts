import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users.service';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class VenkoUserGuard implements CanActivate {
  constructor(private router: Router, private usersService: UsersService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | boolean {
    return this.usersService.currentUser$.pipe(
      map(profile => {
        console.log("GUARD", profile);
        if (profile.userId) {
          return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/profile']);
        return false;
      }),
    );

    // const currentUser = this.usersService.currentUser;
    // if (currentUser?.userId != null) {
    //   // authorised so return true
    //   return true;
    // }



    // return false;
  }
}
