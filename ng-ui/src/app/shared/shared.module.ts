import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AsyncContainerComponent } from './components/async-container/async-container.component';
import { TimerComponent } from './components/timer/timer.component';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { VideoModalComponent } from './components/video-modal/video-modal.component';
import { SafePipe } from './pipes/safe.pipe';
import { DurationPipe } from './pipes/duration.pipe';
import { EnergyBarComponent } from './components/energy-bar/energy-bar.component';
import { MoodComponent } from './components/mood/mood.component';
import { MinDateValidatorDirective } from './directives/min-date-validator/min-date-validator.directive';
import { MaxDateValidatorDirective } from './directives/max-date-validator/max-date-validator.directive';

export function HttpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    NavigationComponent,
    AsyncContainerComponent,
    TimerComponent,
    VideoModalComponent,
    SafePipe,
    DurationPipe,
    EnergyBarComponent,
    MoodComponent,
    MinDateValidatorDirective,
    MaxDateValidatorDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FontAwesomeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [
    TranslateModule,
    NavigationComponent,
    AsyncContainerComponent,
    TimerComponent,
    VideoModalComponent,
    SafePipe,
    DurationPipe,
    EnergyBarComponent,
    MoodComponent,
  ],
})
export class SharedModule {}
