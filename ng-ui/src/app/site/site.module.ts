import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { RoutinesComponent } from './routines/routines.component';
import { RoutineComponent } from './routine/routine.component';
import { UsersComponent } from './users/users.component';
import { ShowcaseComponent } from './showcase/showcase.component';

@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent,
    RoutinesComponent,
    RoutineComponent,
    UsersComponent,
    ShowcaseComponent,
  ],
  imports: [
    NgbModule,
    FontAwesomeModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
  ],
  providers: [],
})
export class SiteModule {}
