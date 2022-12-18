import { Component } from '@angular/core';
import { ViewBase } from '../view.base';
import { Subcontrol } from '../../interfaces/datamodel';
import { ControlService } from '../../services/control.service';

@Component({
  selector: 'control-light-v2-view',
  templateUrl: 'control-light-v2.view.html',
  styleUrls: ['./control-light-v2.view.scss'],
})
export class ControlLightV2View
  extends ViewBase {

  public segment: string = 'moods';

  constructor(public controlService: ControlService) {
    super(controlService);
  }

  updateSegment() {
    // Close any open sliding items when the schedule updates
  }

  getSubcontrols() : Subcontrol[] {
    if (this.control.subcontrols)
      return Object.values(this.control.subcontrols);
  }
}
