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
    super();

    //TODO:, use the control min/max/step. It seems not all dimmers send the states !!!
    this.step = 1;  // Number(this.control.states.step);
    this.min = 0;   // Number(this.control.states.min);
    this.max = 100; // Number(this.control.states.max);
  }

  ngOnInit() {
    this.updateDisplay(this.control);
  }

  public subctrl_slider_change(control) {
    let position = String(control.display.value);

    if (control.type === 'dimmer') {
      if (control.states.position != position) {
        control.states.position = position;
        this.LoxBerryService.sendMessage(control, control.states.position);
      }
    }

    if (control.type === 'color_picker_v2') {
      let res = control.states.color.match(/hsv\(([0-9]*),([0-9]*),([0-9]*)\)/);
      if (res[3] != position) {
        control.states.color = 'hsv(' + res[1] + ',' + res[2] + ',' + position + ')';
        this.LoxBerryService.sendMessage(control, control.states.color);
      }
    }
  }

  public subctrl_slider_updown(control, is_up) {
    let val = control.display.value;
    if (!val) val = 0;

    let new_val;
    if (is_up) new_val = val + this.step;
    else new_val = val - this.step;

    if (new_val < this.min) new_val = this.min;
    if (new_val > this.max) new_val = this.max;

    if (control.type === 'dimmer') {
      control.display.value = new_val;
      control.states.position = String(new_val);
      this.LoxBerryService.sendMessage(control, control.states.position);
    }

    if (control.type === 'color_picker_v2') {
      let res = control.states.color.match(/hsv\(([0-9]*),([0-9]*),([0-9]*)\)/);
      control.states.color = 'hsv(' + res[1] + ',' + res[2] + ',' + new_val + ')';
      this.LoxBerryService.sendMessage(control, control.states.color);
    }

  }

  public subctrl_slider_change2(control) {
    // update control value and send via MQTT when changed
    let position = String(control.display.value);
    let res = control.states.color.match(/hsv\(([0-9]*),([0-9]*),([0-9]*)\)/);
    if (res)
    {
      if (res[3] != position) {
        control.states.color = 'hsv(' + res[1] + ',' + res[2] + ',' + position + ')';
        this.LoxBerryService.sendMessage(control, control.states.color);
      }
    }
  }

  public subctrl_slider_updown2(control, is_up) {
    let val = control.display.value;
    let res = control.states.color.match(/hsv\(([0-9]*),([0-9]*),([0-9]*)\)/);
    console.log(val, res);
    if (!val) val = 0;

    let new_val;
    if (is_up) new_val = val + this.step;
    else new_val = val - this.step;

    if (new_val < this.min) new_val = this.min;
    if (new_val > this.max) new_val = this.max;

    if (res)
    {
      control.states.color = 'hsv(' + res[1] + ',' + res[2] + ',' + new_val + ')';
      this.LoxBerryService.sendMessage(control, control.states.color);
    }
  }


}
