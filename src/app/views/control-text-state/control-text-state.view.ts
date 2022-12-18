import { Component } from '@angular/core';
import { ViewBase } from '../view.base';
import { ControlService } from '../../services/control.service';

@Component({
  selector: 'control-text-state-view',
  templateUrl: 'control-text-state.view.html',
  styleUrls: ['./control-text-state.view.scss'],
})
export class ControlTextStateView
  extends ViewBase {

  constructor(public controlService: ControlService) {
    super(controlService);
  }

}
