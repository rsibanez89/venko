import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './site/home/home.component';
import { ProfileComponent } from './site/profile/profile.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './shared/services/internceptor.service';
import { VenkoAdminGuard } from './shared/guards/venko-admin.guard';
import { VenkoUserGuard } from './shared/guards/venko-user.guard';
import { RoutinesComponent } from './site/routines/routines.component';
import { RoutineComponent } from './site/routine/routine.component';
import { UsersComponent } from './site/users/users.component';
import { ShowcaseComponent } from './site/showcase/showcase.component';

const routes: Routes = [
  {
    path: 'showcase',
    component: ShowcaseComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [VenkoAdminGuard],
  },
  {
    path: 'routines',
    component: RoutinesComponent,
    canActivate: [AuthGuard, VenkoUserGuard]
  },
  {
    path: 'routines/:routineId',
    component: RoutineComponent,
    canActivate: [AuthGuard, VenkoUserGuard]
  },
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }]
})
export class AppRoutingModule {}
