import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ControlViewBase } from '../control.view.base';
import { LoxBerry } from '../../../providers/loxberry';

@Component({
  selector: 'app-control-switch',
  templateUrl: 'control.switch.view.html',
  styleUrls: ['./control.switch.view.scss'],
})
export class ControlSwitchView extends ControlViewBase {

  public off_on = [ "Off", "On"]; // TODO move to control API

  constructor(
    private router: Router,
    public LoxBerryService: LoxBerry
  )
  {
    super(LoxBerryService);
  }

  ngOnInit() {
  }

  radioGroupChange(event) {
    this.control.states.active = String(event.detail.value);
    this.LoxBerryService.sendMessage(this.control, '/cmd', event.detail.value, 0);
  }

  to_string(i: Number) : string {
    return String(i);
  }
}
