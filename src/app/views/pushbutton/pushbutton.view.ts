import { Component } from '@angular/core';
import { ViewBase } from '../view.base';
import { LoxBerryService } from '../../services/loxberry.service';
import { ControlService } from '../../services/control.service';

@Component({
  selector: 'app-pushbutton-view',
  templateUrl: 'pushbutton.view.html',
  styleUrls: ['./pushbutton.view.scss'],
})
export class PushButtonView
  extends ViewBase {

  constructor(
    public loxBerryService: LoxBerryService,
    public controlService: ControlService) {
    super(controlService);
  }

  pushed() {
    this.loxBerryService.sendMessage(this.control, 'pulse');
  }

}
