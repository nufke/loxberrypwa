import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TextView } from '../text/text.view';
import { LoxBerry } from '../../providers/loxberry';

@Component({
  selector: 'control-radio-view',
  templateUrl: 'control-radio.view.html',
  styleUrls: ['./control-radio.view.scss'],
})
export class ControlRadioView
  extends TextView {

  public segment: string = 'moods';

  constructor(public LoxBerryService: LoxBerry) {
    super(LoxBerryService);
  }

  updateSegment() {
    // Close any open sliding items when the schedule updates
  }

}
