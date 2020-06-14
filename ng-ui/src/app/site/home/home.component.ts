import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'venko-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  responseJson: string;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  pingApi() {
    this.ping$().subscribe(res => (this.responseJson = res));
  }

  ping$(): Observable<any> {
    return this.http.get('http://localhost:3000/users');
  }
}
