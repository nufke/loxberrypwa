import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ViewBase } from '../view.base';
import { LoxBerry } from '../../providers/loxberry';

@Component({
  selector: 'app-light-v2-view',
  templateUrl: 'light-v2.view.html',
  styleUrls: ['./light-v2.view.scss'],
})
export class LightV2View extends ViewBase {

  constructor(public LoxBerryService: LoxBerry) {
    super(LoxBerryService);
  }

  ngOnInit() {
    this.updateDisplay(this.control);
  }

  radioGroupChange(event) {
    this.control.states.value = String(event.detail.value);
    this.mood_idx = event.detail.value;
    if (this.mood_idx > 0) {
      this.LoxBerryService.sendMessage(this.control, 'changeTo/' + String(this.mood_list[this.mood_idx].id));
    }
  }

}
