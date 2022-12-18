import { Component } from '@angular/core';
import { TextView } from '../text/text.view';
import { Subcontrol } from '../../interfaces/datamodel';

@Component({
  selector: 'control-irr-view',
  templateUrl: 'control-irr.view.html',
  styleUrls: ['./control-irr.view.scss'],
})
export class ControlIRRView
  extends TextView {

  public segment: string = 'modes';

  constructor() {
    super();
  }

  updateSegment() {
    // Close any open sliding items when the schedule updates
  }

  getSubcontrols() : Subcontrol[] {
    if (this.control.subcontrols)
      return Object.values(this.control.subcontrols);
  }
}
