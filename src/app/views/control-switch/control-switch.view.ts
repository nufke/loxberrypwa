import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TextView } from '../text/text.view';
import { LoxBerry } from '../../providers/loxberry';

@Component({
  selector: 'control-switch-view',
  templateUrl: 'control-switch.view.html',
  styleUrls: ['./control-switch.view.scss'],
})
export class ControlSwitchView extends TextView {

  constructor(
    public LoxBerryService: LoxBerry,
    public translate: TranslateService) {
    super(translate);
  }

  ngOnInit() {
  }

  radioGroupChange(event) {
    this.control.states.active = String(event.detail.value);
    this.LoxBerryService.sendMessage(this.control, event.detail.value);
  }

  to_string(i: Number) : string {
    return String(i);
  }
}
