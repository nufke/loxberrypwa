import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewBase } from '../view.base';
import { LoxBerry } from '../../providers/loxberry';

@Component({
  selector: 'app-switch-view',
  templateUrl: 'switch.view.html',
  styleUrls: ['./switch.view.scss'],
})
export class SwitchView
  extends ViewBase
  implements OnInit {

  public off_on = [ "Off", "On"]; // TODO move to control API

  constructor(public LoxBerryService: LoxBerry) {
    super(LoxBerryService);
  }

  ngOnInit() {
    this.updateDisplay(this.control);
  }

}
