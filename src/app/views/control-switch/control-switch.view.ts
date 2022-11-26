import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ViewBase } from '../view.base';
import { LoxBerry } from '../../providers/loxberry';

@Component({
  selector: 'control-switch-view',
  templateUrl: 'control-switch.view.html',
  styleUrls: ['./control-switch.view.scss'],
})
export class ControlSwitchView extends ViewBase {

  public off_on = [ "Off", "On"]; // TODO move to control API

  constructor(public LoxBerryService: LoxBerry) {
    super(LoxBerryService);
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
