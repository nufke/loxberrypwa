import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ViewBase } from '../view.base';
import { LoxBerry } from '../../providers/loxberry';

@Component({
  selector: 'app-push-view',
  templateUrl: 'push.view.html',
  styleUrls: ['./push.view.scss'],
})
export class PushView extends ViewBase {

  constructor(public LoxBerryService: LoxBerry) {
    super(LoxBerryService);
  }

  pushed() {
    this.LoxBerryService.sendMessage(this.control, '1');
  }

}
