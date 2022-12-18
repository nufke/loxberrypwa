import { Component } from '@angular/core';
import { ViewBase } from '../view.base';
import { LoxBerryService } from '../../services/loxberry.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-radio-view',
  templateUrl: 'radio.view.html',
  styleUrls: ['./radio.view.scss'],
})
export class RadioView
  extends ViewBase {

  constructor(
    public translate: TranslateService,
    public loxBerryService: LoxBerryService) {
    super(translate, loxBerryService);
  }

  ngOnInit() {
    this.updateDisplay(this.control);
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
