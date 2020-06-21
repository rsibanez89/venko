import { Component } from '@angular/core';

@Component({
  selector: 'venko-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-ui';
  copyright = new Date();
}
