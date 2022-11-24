import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ControlViewBase } from '../control.view.base';
import { LoxBerry } from '../../../providers/loxberry';

@Component({
  selector: 'app-control-radio',
  templateUrl: 'control.radio.view.html',
  styleUrls: ['./control.radio.view.scss'],
})
export class ControlRadioView extends ControlViewBase {

  public list: string[];

  constructor(public LoxBerryService: LoxBerry
  )
  {
    super(LoxBerryService);
  }

  ngOnInit() {
    this.updateDisplay(this.control);
  }

  radioGroupChange(event) {
    this.control.states.active_output = String(event.detail.value);
    let msg = String(event.detail.value);
    if (msg === "0") msg = "reset"; // loxone requires reset instead of ID
    this.LoxBerryService.sendMessage(this.control, msg);
  }

  to_string(i: Number) : string {
    return String(i);
  }
}
