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

  public list: any[] = [ { name: "Off" }, { name: "On" } ];

  constructor(
    private router: Router,
    public LoxBerryService: LoxBerry
  )
  {
    super();
  }

  ngOnInit() {
    let list = this.control.state.list;
    if (list && (list.length >=1)) {
      this.list = [ list[0], list[1] ];
    }
  }

  radioGroupChange(event) {
    this.control.state.value = String(event.detail.value);
    this.LoxBerryService.sendMessage(this.control, '/state/value', event.detail.value, 1);
  }

  to_string(i: Number) : string {
    return String(i);
  }
}
