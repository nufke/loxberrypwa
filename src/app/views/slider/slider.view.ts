import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ViewBase } from '../view.base';
import { LoxBerry } from '../../providers/loxberry';

@Component({
  selector: 'app-slider-view',
  templateUrl: 'slider.view.html',
  styleUrls: ['./slider.view.scss'],
})
export class SliderView extends ViewBase {

  public slider_value;
  public text: string;

  constructor(public LoxBerryService: LoxBerry) {
    super(LoxBerryService);
  }

  ngOnInit() {
    this.slider_value = Number(this.control.states.value);
  }

  public slider_value_change() {
    // update control value and send via MQTT when changed
    let new_value = String(this.slider_value);
    if (this.control.states.value != new_value) {
      this.control.states.value = new_value;
      this.LoxBerryService.sendMessage(this.control, this.control.states.value);
    }
  }

}
