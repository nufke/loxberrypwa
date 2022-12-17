import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ViewBase } from '../view.base';
import { LoxBerry } from '../../providers/loxberry';

@Component({
  selector: 'app-pushbutton-view',
  templateUrl: 'pushbutton.view.html',
  styleUrls: ['./pushbutton.view.scss'],
})
export class PushButtonView extends ViewBase {

  constructor(
    public LoxBerryService: LoxBerry,
    public translate: TranslateService) {
    super(translate);
  }

  pushed() {
    this.LoxBerryService.sendMessage(this.control, 'pulse');
  }

}
