import { Component, OnInit } from '@angular/core';
import { ViewBase } from '../view.base';
import { LoxBerryService } from '../../services/loxberry.service';
import { ControlService } from '../../services/control.service';

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

  constructor(
    public loxBerryService: LoxBerryService,
    public controlService: ControlService ) {
    super();

    //TODO:, use the control min/max/step. It seems not all dimmers send the states !!!
    this.step = 1;  // Number(this.control.states.step);
    this.min = 0;   // Number(this.control.states.min);
    this.max = 100; // Number(this.control.states.max);
  }

  ngOnInit() {
    this.controlService.updateDisplay(this.control);
  }

  public subctrl_slider_change(control) {
    let position = String(control.display.value);

    if (control.type === 'dimmer') {
      if (control.states.position != position) {
        control.states.position = position;
        this.loxBerryService.sendMessage(control, control.states.position);
      }
    }

    if (control.type === 'color_picker_v2') {
      let res = control.states.color.match(/hsv\(([0-9]*),([0-9]*),([0-9]*)\)/);
       if (res[3] != position) {
        control.states.color = 'hsv(' + res[1] + ',' + res[2] + ',' + position + ')';
        this.loxBerryService.sendMessage(control, control.states.color);
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
      this.loxBerryService.sendMessage(control, control.states.position);
    }

    if (control.type === 'color_picker_v2') {
      let res = control.states.color.match(/hsv\(([0-9]*),([0-9]*),([0-9]*)\)/);
      control.states.color = 'hsv(' + res[1] + ',' + res[2] + ',' + new_val + ')';
      this.loxBerryService.sendMessage(control, control.states.color);
    }
  }

}
