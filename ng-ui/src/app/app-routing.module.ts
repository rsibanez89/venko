import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './site/home/home.component';
import { ProfileComponent } from './site/profile/profile.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './shared/services/interceptor.service';
import { VenkoAdminGuard } from './shared/guards/venko-admin.guard';
import { VenkoUserGuard } from './shared/guards/venko-user.guard';
import { RoutinesComponent } from './site/routines/routines.component';
import { RoutineComponent } from './site/routine/routine.component';
import { UsersComponent } from './site/users/users.component';
import { ShowcaseComponent } from './site/showcase/showcase.component';
import { TrainingHistoryComponent } from './site/training-history/training-history.component';
import { TermsAndConditionsComponent } from './site/terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyComponent } from './site/privacy-policy/privacy-policy.component';
import { TrainingHistoryEveryoneComponent } from './site/training-history-everyone/training-history-everyone.component';

const routes: Routes = [
  {
    path: 'showcase',
    component: ShowcaseComponent,
  },
  {
    path: 'terms-and-conditions',
    component: TermsAndConditionsComponent,
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
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
    canActivate: [AuthGuard, VenkoUserGuard],
  },
  {
    path: 'routines/:routineId',
    component: RoutineComponent,
    canActivate: [AuthGuard, VenkoUserGuard],
  },
  {
    path: 'training-history',
    component: TrainingHistoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'training-history-everyone',
    component: TrainingHistoryEveryoneComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
})
export class AppRoutingModule {}
