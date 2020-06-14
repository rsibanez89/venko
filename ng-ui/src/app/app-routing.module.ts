import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './site/home/home.component';
import { ProfileComponent } from './site/profile/profile.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './shared/services/internceptor.service';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
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
