import { Component, ViewChild } from '@angular/core';
import { TimerComponent } from '../../shared/components/timer/timer.component';

@Component({
  selector: 'venko-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss'],
})
export class ShowcaseComponent {
  @ViewChild(TimerComponent) timer: TimerComponent;

  private isResting = false;
  public restTime = 30;

  public initTimer() {
    this.timer.startTimer(10);
  }

  public stopTimer() {
    this.timer.stopTimer();
  }

  public pauseOrResumeTimer() {
    this.timer.pauseOrResumeTimer();
  }

  public whenTimerEnded() {
    this.isResting = !this.isResting;
    if (this.isResting) {
      this.timer.startTimer(this.restTime);
      this.timer.setDarkMode(false);
    } else {
      this.timer.startTimer(10);
      this.timer.setDarkMode(true);
    }
  }
}
