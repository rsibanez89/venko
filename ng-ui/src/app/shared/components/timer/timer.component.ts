import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'venko-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  private splitTime: number[];
  private subscription: Subscription;
  public isDark = true;
  public time: string;
  private numbers: Observable<number>;
  public paused = false;
  private stopped = true;
  @Output() timerEnded = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.resetTimer();
    this.numbers = interval(1000);
  }

  public setDarkMode(dark: boolean) {
    this.isDark = dark;
  }

  public startTimer(limit: number) {
    this.stopTimer();
    this.paused = false;
    this.stopped = false;
    let elapsedTime = 0;
    this.subscription = this.numbers.pipe(takeWhile(() => !this.stopped)).subscribe(_ => {
      if (!this.paused) {
        elapsedTime++;
        this.addSecond();
        this.formatTimer();
        if (elapsedTime === limit) {
          this.timerEnded.emit(true);
        }
      }
    });
  }

  public stopTimer() {
    this.stopped = true;
    this.subscription?.unsubscribe();
    this.resetTimer();
  }

  public pauseOrResumeTimer() {
    this.paused = !this.paused;
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
