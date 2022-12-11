import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ViewBase } from '../view.base';
import { LoxBerry } from '../../providers/loxberry';

@Component({
  selector: 'app-radio-switch-view',
  templateUrl: 'radio-switch.view.html',
  styleUrls: ['./radio-switch.view.scss'],
})
export class RadioSwitchView extends ViewBase {

  public off_on = [ "Off", "On"]; // TODO move to control API

  constructor(public LoxBerryService: LoxBerry) {
    super();
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
