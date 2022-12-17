import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TextView } from '../text/text.view';
import { LoxBerry } from '../../providers/loxberry';
import { Control, Subcontrol, Category, Room } from '../../interfaces/datamodel'

@Component({
  selector: 'control-color-picker-v2.view',
  templateUrl: 'control-color-picker-v2.view.html',
  styleUrls: ['./control-color-picker-v2.view.scss'],
})
export class ControlColorPickerV2View
  extends TextView
  implements OnInit {

  public segment: string = 'color';
  public mode_rgb: Boolean;

  constructor(
    public LoxBerryService: LoxBerry,
    public translate: TranslateService) {
    super(translate);

    this.mode_rgb = true;
  }

  ngOnInit() {
  }

  updateSegment() {
    // Close any open sliding items when the schedule updates
  }

  switch_picker() {
    this.mode_rgb = !this.mode_rgb;
  }

}
