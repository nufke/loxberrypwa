import { Component } from '@angular/core';
import { TextView } from '../text/text.view';

@Component({
  selector: 'control-slider-view',
  templateUrl: 'control-slider.view.html',
  styleUrls: ['./control-slider.view.scss'],
})
export class ControlSliderView
  extends TextView {

  constructor() {
    super();
  }

}
