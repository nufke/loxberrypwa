import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TextView } from '../text/text.view';
import { LoxBerry } from '../../providers/loxberry';

@Component({
  selector: 'control-text-state-view',
  templateUrl: 'control-text-state.view.html',
  styleUrls: ['./control-text-state.view.scss'],
})
export class ControlTextStateView
  extends TextView {

  constructor(public LoxBerryService: LoxBerry) {
    super();
  }

}
