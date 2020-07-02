import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { AsyncContainerComponent } from './components/async-container/async-container.component';
import { TimerComponent } from './components/timer/timer.component';

@NgModule({
  declarations: [NavigationComponent, AsyncContainerComponent, TimerComponent],
  exports: [NavigationComponent, AsyncContainerComponent, TimerComponent],
  imports: [CommonModule, RouterModule, NgbModule, FontAwesomeModule],
})
export class SharedModule {}
