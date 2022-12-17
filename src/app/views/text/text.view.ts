import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ViewBase } from '../view.base';
import { LoxBerry } from '../../providers/loxberry';

@Component({
  selector: 'app-text-view',
  templateUrl: 'text.view.html',
  styleUrls: ['./text.view.scss'],
})
export class TextView
  extends ViewBase {

  constructor(public translate: TranslateService) {
    super(translate);
  }

}
