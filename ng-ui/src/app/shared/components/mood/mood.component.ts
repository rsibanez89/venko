import { Component, Input } from '@angular/core';
import {
  faAngry,
  faDizzy,
  faFrown,
  faFlushed,
  faGrin,
  faGrinTongueWink,
} from '@fortawesome/free-solid-svg-icons';
import { Mood } from '../../../../app/store/training-history/training-history.dto';

@Component({
  selector: 'venko-mood',
  templateUrl: './mood.component.html',
  styleUrls: ['./mood.component.scss'],
})
export class MoodComponent {
  public Mood = Mood;
  public faAngry = faAngry;
  public faDizzy = faDizzy;
  public faFrown = faFrown;
  public faFlushed = faFlushed;
  public faGrin = faGrin;
  public faGrinTongueWink = faGrinTongueWink;

  @Input()
  mood: Mood = Mood.Bad;

  isMood(value: Mood) {
    return +Mood[this.mood] === +value.toString();
  }
}
