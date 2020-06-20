import { Component, Input } from '@angular/core';

@Component({
  selector: 'venko-async-container',
  templateUrl: './async-container.component.html',
  styleUrls: ['./async-container.component.scss'],
})
export class AsyncContainerComponent {
  @Input()
  isLoading: boolean;
}
