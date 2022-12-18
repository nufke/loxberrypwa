import { Component } from '@angular/core';
import { ViewBase } from '../view.base';
import { LoxBerryService } from '../../services/loxberry.service';
import { ControlService } from '../../services/control.service';

@Component({
  selector: 'app-slider-view',
  templateUrl: 'slider.view.html',
  styleUrls: ['./slider.view.scss'],
})
export class SliderView
  extends ViewBase {

  public slider_value: number;
  public text: string;

  constructor(
    public loxBerryService: LoxBerryService,
    public controlService: ControlService) {
    super(controlService);
  }

  ngOnInit() {
    this.slider_value = Number(this.control.states.value);
  }

  public slider_value_change() {
    // update control value and send via MQTT when changed
    let new_value = String(this.slider_value);
    if (this.control.states.value != new_value) {
      this.control.states.value = new_value;
      this.loxBerryService.sendMessage(this.control, this.control.states.value);
    }
  }

}
