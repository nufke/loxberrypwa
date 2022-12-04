import { Component, OnInit } from '@angular/core';
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
implements OnInit {

  constructor(public LoxBerryService: LoxBerry) {
    super(LoxBerryService);
  }

  ngOnInit() {
    this.updateDisplay(this.control);
  }

  public subctrl_slider_change(control) {
    // update control value and send via MQTT when changed
    let position = String(this.control.display.value);
    if (this.control.states.position != position) {
      this.control.states.position = position;
      this.LoxBerryService.sendMessage(this.control, this.control.states.position);
    }
  }

  public subctrl_slider_updown(control, is_up) {
    let val = this.control.display.value;
    if (!val) val = 0;
    let step = Number(this.control.states.step);
    let min = Number(this.control.states.min);
    let max = Number(this.control.states.max);

    if (!min) min = 0;
    if (!max) max = 100;
    if (!step) step = 1;

    let new_val;
    if (is_up) new_val = val + step;
    else new_val = val - step;

    if (new_val < min) new_val = min;
    if (new_val > max) new_val = max;

    this.control.display.value = new_val;
    this.control.states.position = String(new_val);
    this.LoxBerryService.sendMessage(this.control, this.control.states.position);
  }
}
