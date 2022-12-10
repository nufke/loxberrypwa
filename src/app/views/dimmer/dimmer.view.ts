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

  public min: number;
  public max: number;
  public step: number;

  constructor(public LoxBerryService: LoxBerry) {
    super(LoxBerryService);

    //TODO:, use the control min/max/step. It seems not all dimmers send the states !!!
    this.step = 1;  // Number(this.control.states.step);
    this.min = 0;   // Number(this.control.states.min);
    this.max = 100; // Number(this.control.states.max);
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

    let new_val;
    if (is_up) new_val = val + this.step;
    else new_val = val - this.step;

    if (new_val < this.min) new_val = this.min;
    if (new_val > this.max) new_val = this.max;

    this.control.display.value = new_val;
    this.control.states.position = String(new_val);
    this.LoxBerryService.sendMessage(this.control, this.control.states.position);
  }
}
