import { Component } from '@angular/core';
import { ViewBase } from '../view.base';
import { Subcontrol } from '../../interfaces/datamodel';
import { ControlService } from '../../services/control.service';

@Component({
  selector: 'control-irr-view',
  templateUrl: 'control-irr.view.html',
  styleUrls: ['./control-irr.view.scss'],
})
export class ControlIRRView
  extends ViewBase {

  public segment: string = 'modes';

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
