import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TextView } from '../text/text.view';
import { LoxBerry } from '../../providers/loxberry';
import { Control, Subcontrol, Category, Room } from '../../interfaces/datamodel'

@Component({
  selector: 'control-light-v2-view',
  templateUrl: 'control-light-v2.view.html',
  styleUrls: ['./control-light-v2.view.scss'],
})
export class ControlLightV2View
  extends TextView {

  public segment: string = 'moods';

  constructor(public LoxBerryService: LoxBerry) {
    super(LoxBerryService);
  }

  updateSegment() {
    // Close any open sliding items when the schedule updates
  }

  getSubcontrols() : Subcontrol[] {
    if (this.control.subcontrols)
      return Object.values(this.control.subcontrols);
  }
}
