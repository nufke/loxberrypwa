import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ControlBase } from '../control.base';

@Component({
  selector: 'app-control-light',
  templateUrl: 'control.light.page.html',
  styleUrls: ['./control.light.page.scss'],
})
export class ControlLightPage extends ControlBase {

  color = '#ffffff';
  segment = 'moods';

  subControls: any = [];
  moods: any = [
    "Standard", "Alles aan", "Uit"
  ];

  moodSelected:string;

  currentValue : number = 10;

  constructor(
    private router: Router
  )
  {
    super(); //translate, dataservice
  }

  ngOnInit() {
    this.subControls = Object.values(this.control.subControls);
    console.log('subControls: ', this.subControls);
    this.moodSelected = "Uit";
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
