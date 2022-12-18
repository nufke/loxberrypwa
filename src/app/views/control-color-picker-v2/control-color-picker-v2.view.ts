import { Component, OnInit } from '@angular/core';
import { ViewBase } from '../view.base';
import { TranslateService } from '@ngx-translate/core';
import { LoxBerryService } from '../../services/loxberry.service';

@Component({
  selector: 'control-color-picker-v2.view',
  templateUrl: 'control-color-picker-v2.view.html',
  styleUrls: ['./control-color-picker-v2.view.scss'],
})
export class ControlColorPickerV2View
  extends ViewBase {

  public segment: string = 'color';
  public mode_rgb: Boolean;

  constructor(
    public translate: TranslateService,
    public loxBerryService: LoxBerryService) {
    super(translate, loxBerryService);
    this.mode_rgb = true;
  }

  updateSegment() {
    // Close any open sliding items when the schedule updates
  }

  switch_picker() {
    this.mode_rgb = !this.mode_rgb;
  }

}
