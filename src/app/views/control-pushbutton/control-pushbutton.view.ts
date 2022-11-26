import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TextView } from '../text/text.view';
import { LoxBerry } from '../../providers/loxberry';

@Component({
  selector: 'control-pushbutton-view',
  templateUrl: 'control-pushbutton.view.html',
  styleUrls: ['./control-pushbutton.view.scss'],
})
export class ControlPushbuttonView
  extends TextView {

  constructor(public LoxBerryService: LoxBerry) {
    super(LoxBerryService);
  }

}
