import { Component, Input } from '@angular/core';

@Component({
  selector: 'venko-energy-bar',
  templateUrl: './energy-bar.component.html',
  styleUrls: ['./energy-bar.component.scss']
})
export class EnergyBarComponent {

  @Input()
  energy: number;

  @Input()
  maxEnergy = 5;

  get percentage() {
    return (this.energy * 100) / this.maxEnergy;
  }
}
