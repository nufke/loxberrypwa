import { Component } from '@angular/core';
import { ViewBase } from '../view.base';
import { LoxBerryService } from '../../services/loxberry.service';
import { ControlService } from '../../services/control.service';

@Component({
  selector: 'app-radio-switch-view',
  templateUrl: 'radio-switch.view.html',
  styleUrls: ['./radio-switch.view.scss'],
})
export class RadioSwitchView
  extends ViewBase {

  constructor(
    public loxBerryService: LoxBerryService,
    public controlService: ControlService) {
    super(controlService);
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
