import { Component } from '@angular/core';
import { ViewBase } from '../view.base';
import { LoxBerryService } from '../../services/loxberry.service';
import { ControlService } from '../../services/control.service';

@Component({
  selector: 'app-radio-view',
  templateUrl: 'radio.view.html',
  styleUrls: ['./radio.view.scss'],
})
export class RadioView
  extends ViewBase {

  public list: string[];

  constructor(
    public loxBerryService: LoxBerryService,
    public controlService: ControlService) {
    super(controlService);
  }

  ngOnInit() {
    //this.updateDisplay(this.control);
  }

  radioGroupChange(event) {
    this.control.states.active_output = String(event.detail.value);
    let msg = String(event.detail.value);
    if (msg === "0") msg = "reset"; // loxone requires reset instead of ID
    this.loxBerryService.sendMessage(this.control, msg);
  }

  to_string(i: Number) : string {
    return String(i);
  }
}
