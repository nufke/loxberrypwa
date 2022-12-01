import { Component, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ViewBase } from '../view.base';
import { LoxBerry } from '../../providers/loxberry';

@Component({
  selector: 'app-dimmer-view',
  templateUrl: 'dimmer.view.html',
  styleUrls: ['./dimmer.view.scss'],
})
export class DimmerView
  extends ViewBase
  implements OnChanges {

  public position; // slider position
  public text: string;

  constructor(public LoxBerryService: LoxBerry) {
    super(LoxBerryService);
  }

  ngOnChanges() {
    this.position = Number(this.control.states.position);
    console.log('slider value:', this.position);
  }

  public subctrl_slider_change(control) {
    // update control value and send via MQTT when changed
    let pos = String(this.position);
    if (control.states.position != pos) {
      control.states.position = pos;
      this.LoxBerryService.sendMessage(control, control.states.position);
    }
  }

  public subctrl_slider_updown(control, is_up) {
    let val = Number(control.states.position);
    if (!val) val = 0;
    let step = Number(control.states.step);
    let min = Number(control.states.min);
    let max = Number(control.states.max);

    if (!min) min = 0;
    if (!max) max = 100;
    if (!step) step = 1;

    let new_val;
    if (is_up) new_val = val + step;
    else new_val = val - step;

    if (new_val < min) new_val = min;
    if (new_val > max) new_val = max;

    control.states.position = String(new_val);
    this.LoxBerryService.sendMessage(control, control.states.position);
  }
}
