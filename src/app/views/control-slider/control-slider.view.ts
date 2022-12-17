import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TextView } from '../text/text.view';
import { LoxBerry } from '../../providers/loxberry';

@Component({
  selector: 'control-slider-view',
  templateUrl: 'control-slider.view.html',
  styleUrls: ['./control-slider.view.scss'],
})
export class ControlSliderView
  extends TextView {

  constructor(
    public LoxBerryService: LoxBerry,
    public translate: TranslateService) {
    super(translate);
  }

}
