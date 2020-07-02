import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'venko-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  private splitTime: number[];
  public isDark = true;
  public time: string;
  private numbers: Observable<number>;
  @Output() timerEnded = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {
    this.resetTimer();
    this.numbers = interval(1000);
  }

  public setDarkMode(dark: boolean) {
    this.isDark = dark;
  }

  public startTimer(limit: number) {
    this.resetTimer();
    this.numbers.pipe(take(limit)).subscribe(x => {
      this.addSecond();
      this.formatTimer();
      if (x === limit - 1) {
        this.timerEnded.emit(true);
      }
    });
  }

  public addSecond() {
    if (this.splitTime[1] === 59) {
      this.splitTime[1] = 0;
      this.addHour();
    } else {
      this.splitTime[1] = this.splitTime[1] + 1;
    }
  }

  public addHour() {
    if (this.splitTime[0] === 23) {
      this.splitTime[0] = 0;
    } else {
      this.splitTime[0] = this.splitTime[0] + 1;
    }
  }

  public resetTimer() {
    this.splitTime = [0, 0];
    this.formatTimer();
  }

  public formatTimer() {
    const minutes = ('0' + this.splitTime[1]).slice(-2);
    const hours = ('0' + this.splitTime[0]).slice(-2);
    this.time = `${hours}:${minutes}`;
  }
}
