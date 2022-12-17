import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ViewBase } from '../view.base';
import { LoxBerry } from '../../providers/loxberry';

@Component({
  selector: 'app-radio-view',
  templateUrl: 'radio.view.html',
  styleUrls: ['./radio.view.scss'],
})
export class RadioView extends ViewBase {

  public list: string[];

  constructor(
    public LoxBerryService: LoxBerry,
    public translate: TranslateService) {
    super(translate);
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
