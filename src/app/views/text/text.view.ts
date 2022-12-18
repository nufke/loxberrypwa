import { Component, Input } from '@angular/core';
import { ViewBase } from '../view.base';
import { ControlService } from '../../services/control.service';

@Component({
  selector: 'app-text-view',
  templateUrl: 'text.view.html',
  styleUrls: ['./text.view.scss'],
})
export class TextView
  extends ViewBase {

  constructor(public controlService: ControlService) {
    super(controlService);
  }

}
