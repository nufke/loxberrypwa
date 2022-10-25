import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ControlBase } from '../control.base';

@Component({
  selector: 'app-control-slider',
  templateUrl: 'control.slider.page.html',
  styleUrls: ['./control.slider.page.scss'],
})
export class ControlSliderPage extends ControlBase {

  public slider_value = 0;

  constructor(
    private router: Router
  )
  {
    super();
  }

  ngOnInit() {


  }

  get_slider_value() {
    console.log("range value:", this.slider_value);
  }

  slider_up_pressed() {
    this.calculate_value(true);
  }

  slider_down_pressed() {
    this.calculate_value(false);
  }

  calculate_value(up: Boolean) {

    let min = this.control.state['min'];
    let max = this.control.state['max'];
    let step = this.control.state['step'];


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
