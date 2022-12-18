import { Component, OnInit } from '@angular/core';
import { ViewBase } from '../view.base';
import { LoxBerryService } from '../../services/loxberry.service';
import { ControlService } from '../../services/control.service';

@Component({
  selector: 'app-light-v2-view',
  templateUrl: 'light-v2.view.html',
  styleUrls: ['./light-v2.view.scss'],
})
export class LightV2View
  extends ViewBase
  implements OnInit {

  constructor(
    public loxBerryService: LoxBerryService,
    public controlService: ControlService) {
    super();
  }

  ngOnInit() {
    this.controlService.updateDisplay(this.control);
  }

  radioGroupChange(event) {
    let mood_idx = this.control.states.mood_list.findIndex( item => item.name === event.detail.value);
    this.control.states.value = event.detail.value;
    if (mood_idx >= 0) {
      this.loxBerryService.sendMessage(this.control, 'changeTo/' + String(this.control.states.mood_list[mood_idx].id));
    }
  }

}
