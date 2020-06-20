import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/app/app.reducer';
import { filter } from 'rxjs/operators';
import { getProfileIsVenkoUser, getProfile } from 'src/app/store/profile/profile.selector';

@Component({
  selector: 'venko-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  responseJson: string;

  constructor(
    private http: HttpClient,
    public auth: AuthService,
    private store: Store<AppState>,
  ) {}

  ngOnInit(): void {
    this.store
      .pipe(
        select(getProfileIsVenkoUser),
      )
      .subscribe(isVenkoUser => {
        console.log(isVenkoUser);
      });
    this.store
      .pipe(
        select(getProfile),
      )
      .subscribe(isVenkoUser => {
        console.log(isVenkoUser);
      });
  }

  pingApi() {
    this.ping$().subscribe(res => (this.responseJson = res));
  }

  ping$(): Observable<any> {
    return this.http.get('http://localhost:3000/users');
  }
}
