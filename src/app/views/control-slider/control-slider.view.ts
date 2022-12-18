import { Component } from '@angular/core';
import { ViewBase } from '../view.base';
import { ControlService } from '../../services/control.service';

@Component({
  selector: 'control-slider-view',
  templateUrl: 'control-slider.view.html',
  styleUrls: ['./control-slider.view.scss'],
})
export class ControlSliderView
  extends ViewBase{

  constructor(public controlService: ControlService) {
    super(controlService);
  }

}
