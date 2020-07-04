import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

// tslint:disable-next-line: ban-types
declare let gtag: Function;

@Component({
  selector: 'venko-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'G-ED79ZZHFKJ', {
          page_path: event.urlAfterRedirects,
        });
      }
    });
  }
}
