import { Component, OnInit } from '@angular/core';
import { ViewBase } from '../view.base';

@Component({
  selector: 'app-switch-view',
  templateUrl: 'switch.view.html',
  styleUrls: ['./switch.view.scss'],
})
export class SwitchView
  extends ViewBase
  implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
    if (this.control.states.active === "1")
      this.control.display.toggle = true;
    else
      this.control.display.toggle = false;
  }

}
