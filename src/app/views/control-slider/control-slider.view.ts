import { Component } from '@angular/core';
import { ViewBase } from '../view.base';
import { TranslateService } from '@ngx-translate/core';
import { LoxBerryService } from '../../services/loxberry.service';

@Component({
  selector: 'control-slider-view',
  templateUrl: 'control-slider.view.html',
  styleUrls: ['./control-slider.view.scss'],
})
export class ControlSliderView
  extends ViewBase{

  constructor(
    public translate: TranslateService,
    public loxBerryService: LoxBerryService) {
    super(translate, loxBerryService);
  }

}
