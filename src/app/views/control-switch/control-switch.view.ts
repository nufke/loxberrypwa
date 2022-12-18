import { Component } from '@angular/core';
import { TextView } from '../text/text.view';
import { LoxBerryService } from '../../services/loxberry.service';

@Component({
  selector: 'control-switch-view',
  templateUrl: 'control-switch.view.html',
  styleUrls: ['./control-switch.view.scss'],
})
export class ControlSwitchView extends TextView {

  constructor(
    public loxBerryService: LoxBerryService) {
    super();
  }

  ngOnInit() {
  }

  radioGroupChange(event) {
    this.control.states.active = String(event.detail.value);
    this.loxBerryService.sendMessage(this.control, event.detail.value);
  }

  to_string(i: Number) : string {
    return String(i);
  }
}
