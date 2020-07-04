import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { PublicRoutesService } from '../guards/public-routes.service';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor(
    private auth: AuthService,
    private publicRoutesService: PublicRoutesService,
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (this.publicRoutesService.isPublicRouteRequest(req)) {
      return next.handle(req);
    }
    return this.auth.getTokenSilently$().pipe(
      mergeMap(token => {
        const tokenReq = req.clone({
          setHeaders: { Authorization: `Bearer ${token}` },
        });
        return next.handle(tokenReq);
      }),
      // catchError(err => {
      //   console.log(err);
      //   return of(err);
      // })
    );
  }
}
