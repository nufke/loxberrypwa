import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ControlBase } from '../control.base';
import { LoxBerry } from '../../../providers/loxberry';

@Component({
  selector: 'app-control-switch',
  templateUrl: 'control.switch.page.html',
  styleUrls: ['./control.switch.page.scss'],
})
export class ControlSwitchPage extends ControlBase {

  public toggle_state = ["Off", "On"];

  constructor(
    private router: Router,
    public LoxBerryService: LoxBerry
  )
  {
    super();
  }

  ngOnInit() {
    console.log('control:', this.control );
  }

  radioGroupChange(event) {
    this.control.state.value = String(event.detail.value);
    this.LoxBerryService.sendMessage(this.control, '/state/value', event.detail.value, 1);
  }
}
