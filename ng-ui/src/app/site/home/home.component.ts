import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app/app.reducer';

@Component({
  selector: 'venko-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(public auth: AuthService, private store: Store<AppState>) {}

  ngOnInit(): void {
    // TODO: check if the user is already logged in and display the profile picture instead of login button.
  }
}
