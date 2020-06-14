import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
  ]
})
export class SiteModule { }
