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

  // add extra text for IRC
  extraText(control, item) {
    if (control.type === 'i_room_controller') {
      return ''; //TODO
    }
  }

  // TODO: move button control to central controller
  radioGroupChange(control, event) {

    if (control.type === 'radio') {
      let idx = this.radio_list.findIndex( item => item.name === event.detail.value);
      control.states.active_output = String(this.radio_list[idx].id);
      let msg = control.states.active_output
      if (msg === "0") msg = "reset"; // loxone requires reset instead of ID
      this.loxBerryService.sendMessage(control, msg);
    }

    if (control.type === 'light_controller_v2') {
      let idx = this.radio_list.findIndex( item => item.name === event.detail.value);
      control.states.value = event.detail.value;
      if (idx >= 0) { // exists
        this.loxBerryService.sendMessage(control, 'changeTo/' + String(this.radio_list[idx].id));
      }
    }

    if (control.type === 'i_room_controller') {
      //TODO
    }
  }

}
