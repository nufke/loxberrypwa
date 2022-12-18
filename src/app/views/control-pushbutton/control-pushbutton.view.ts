import { Component } from '@angular/core';
import { ViewBase } from '../view.base';
import { ControlService } from '../../services/control.service';

@Component({
  selector: 'control-pushbutton-view',
  templateUrl: 'control-pushbutton.view.html',
  styleUrls: ['./control-pushbutton.view.scss'],
})
export class ControlPushbuttonView
  extends ViewBase {

  constructor(public controlService: ControlService) {
    super(controlService);
  }

}
