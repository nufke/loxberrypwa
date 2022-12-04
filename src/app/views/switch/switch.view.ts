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

  constructor(public LoxBerryService: LoxBerry) {
    super(LoxBerryService);
  }

  ngOnInit() {
    if (this.control.states.active === "1")
      this.control.display.toggle = true;
    else
      this.control.display.toggle = false;
  }

}
