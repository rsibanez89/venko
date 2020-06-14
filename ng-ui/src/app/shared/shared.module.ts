import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavigationComponent],
  exports: [NavigationComponent],
  imports: [CommonModule, RouterModule, NgbModule, FontAwesomeModule],
})
export class SharedModule {}
