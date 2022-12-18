import { Component } from '@angular/core';
import { ViewBase } from '../view.base';
import { LoxBerryService } from '../../services/loxberry.service';
import { TranslateService } from '@ngx-translate/core';

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
    public translate: TranslateService,
    public loxBerryService: LoxBerryService) {
    super(translate, loxBerryService);
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
