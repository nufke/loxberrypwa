import { Component, Input, OnInit } from '@angular/core';
import { ViewBase } from '../view.base';
import { ControlService } from '../../services/control.service';

@Component({
  selector: 'app-switch-view',
  templateUrl: 'switch.view.html',
  styleUrls: ['./switch.view.scss'],
})
export class SwitchView
  extends ViewBase
  implements OnInit {

  constructor(public controlService: ControlService) {
    super(controlService);
  }

  ngOnInit() {
    if (this.control.states.active === "1")
      this.control.display.toggle = true;
    else
      this.control.display.toggle = false;
  }

}
