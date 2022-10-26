import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ControlViewBase } from '../control.view.base';

@Component({
  selector: 'app-control-light',
  templateUrl: 'control.light.view.html',
  styleUrls: ['./control.light.view.scss'],
})
export class ControlLightView extends ControlViewBase {

  color = '#ffffff';
  segment = 'moods';

  subControls: any = [];
  moods: any = [
    "Standard", "Alles aan", "Uit"
  ];

  moodSelected: string;

  currentValue : number = 10;

  constructor(
    private router: Router
  )
  {
    super(); // translate, dataservice
  }

  ngOnInit() {
  }

  updateSegment() {
    // Close any open sliding items when the schedule updates
  }

  getValue() {
    console.log('range: ', this.currentValue);
  }

  radioChanged() {
    console.log('radioSelect: ', this.moodSelected);
  }
}
