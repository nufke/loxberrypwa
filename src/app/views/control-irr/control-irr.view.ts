import { Component } from '@angular/core';
import { ViewBase } from '../view.base';
import { Subcontrol } from '../../interfaces/datamodel';
import { TranslateService } from '@ngx-translate/core';
import { LoxBerryService } from '../../services/loxberry.service';

@Component({
  selector: 'control-irr-view',
  templateUrl: 'control-irr.view.html',
  styleUrls: ['./control-irr.view.scss'],
})
export class ControlIRRView
  extends ViewBase {

  public segment: string = 'modes';

  constructor(
    public translate: TranslateService,
    public loxBerryService: LoxBerryService) {
    super(translate, loxBerryService);
  }

  updateSegment() {
    // Close any open sliding items when the schedule updates
  }

  getSubcontrols() : Subcontrol[] {
    if (this.control.subcontrols)
      return Object.values(this.control.subcontrols);
  }
}
