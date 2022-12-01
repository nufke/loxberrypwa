import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TextView } from '../text/text.view';
import { LoxBerry } from '../../providers/loxberry';

@Component({
  selector: 'control-light-v2-view',
  templateUrl: 'control-light-v2.view.html',
  styleUrls: ['./control-light-v2.view.scss'],
})
export class ControlLightV2View
  extends TextView
  implements OnInit {

  public segment: string = 'moods';

  public subcontrols: any;

  constructor(public LoxBerryService: LoxBerry) {
    super(LoxBerryService);
  }

  ngOnInit() {
    this.updateDisplay(this.control);
    console.log('bla');
  }

  updateSegment() {
    // Close any open sliding items when the schedule updates
  }

  getSubcontrols() {
    if (this.control.subcontrols)
      return Object.values(this.control.subcontrols);
  }
}
