import { Component } from '@angular/core';
import { ViewBase } from '../view.base';
import { ControlService } from '../../services/control.service';

@Component({
  selector: 'control-radio-view',
  templateUrl: 'control-radio.view.html',
  styleUrls: ['./control-radio.view.scss'],
})
export class ControlRadioView
 extends ViewBase {

  public segment: string = 'moods';

  constructor(public controlService: ControlService) {
    super(controlService);
  }

}
