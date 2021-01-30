import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faUser, faPowerOff, faUsers, faHistory } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'venko-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  public isOpen = false;
  public faUser = faUser;
  public faUsers = faUsers;
  public faHistory = faHistory;
  public faPowerOff = faPowerOff;

  constructor(
    public route: ActivatedRoute,
    public auth: AuthService,
    public usersService: UsersService,
  ) {

  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }
}
