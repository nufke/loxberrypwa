import { Component } from '@angular/core';
import { ViewBase } from '../view.base';
import { ControlService } from '../../services/control.service';

@Component({
  selector: 'control-switch-view',
  templateUrl: 'control-switch.view.html',
  styleUrls: ['./control-switch.view.scss'],
})
export class ControlSwitchView
  extends ViewBase {

  constructor(public controlService: ControlService) {
    super(controlService);
  }

  ngOnInit() {
  }

}
