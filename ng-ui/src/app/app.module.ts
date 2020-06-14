import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './shared/shared.module';
import { SiteModule } from './site/site.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/app/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './store/app/app.effects';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    SharedModule,
    SiteModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
