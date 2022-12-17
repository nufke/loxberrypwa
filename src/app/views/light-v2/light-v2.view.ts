import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from "rxjs";
import { ViewBase } from '../view.base';
import { LoxBerry } from '../../providers/loxberry';

@Component({
  selector: 'app-light-v2-view',
  templateUrl: 'light-v2.view.html',
  styleUrls: ['./light-v2.view.scss'],
})
export class LightV2View
  extends ViewBase
  implements OnInit {

  constructor(
    public LoxBerryService: LoxBerry,
    public translate: TranslateService) {
    super(translate);
  }

  ngOnInit() {
    this.updateDisplay(this.control);
  }

  radioGroupChange(event) {
    let mood_idx = this.control.states.mood_list.findIndex( item => item.name === event.detail.value);
    this.control.states.value = event.detail.value;
    if (mood_idx >= 0) {
      this.LoxBerryService.sendMessage(this.control, 'changeTo/' + String(this.control.states.mood_list[mood_idx].id));
    }
  }

}
