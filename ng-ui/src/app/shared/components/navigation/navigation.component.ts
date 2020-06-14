import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faUser, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'venko-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  public isOpen = false;

  faUser = faUser;
  faPowerOff = faPowerOff;

  public links = [
    { title: 'One', fragment: 'one' },
    { title: 'Two', fragment: 'two' }
  ];

  constructor(public route: ActivatedRoute, public auth: AuthService) { }

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }
}
