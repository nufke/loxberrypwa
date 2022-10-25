import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ControlBase } from '../control.base';
import { LoxBerry } from '../../../providers/loxberry';

@Component({
  selector: 'app-control-slider',
  templateUrl: 'control.slider.page.html',
  styleUrls: ['./control.slider.page.scss'],
})
export class ControlSliderPage extends ControlBase {

  public slider_value;

  constructor(
    private router: Router,
    public LoxBerryService: LoxBerry
  )
  {
    super();
  }

  ngOnInit() {
    this.slider_value = Number(this.control.state['value']);
  }

  get_slider_value() {
    // update control value and send via MQTT
    this.control.state.value = String(this.slider_value);
    this.LoxBerryService.sendMessage(this.control, '/state/value', this.control.state.value, 1);
  }

  slider_up_pressed() {
    this.calculate_value(true);
  }

  slider_down_pressed() {
    this.calculate_value(false);
  }

  calculate_value(up: Boolean) {

    let min = Number(this.control.state['min']);
    let max = Number(this.control.state['max']);
    let step = Number(this.control.state['step']);

    if (!min) min = 0;
    if (!max) max = 100;
    if (!step) step = 1;

    let val;
    if (up) val = this.slider_value + step;
    else val = this.slider_value - step;

    if (val >= max) val = max;
    if (val <= min) val = min;
    this.slider_value = val;
  }
}
