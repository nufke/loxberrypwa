import { Component, Input } from '@angular/core';
import { ButtonAction } from '../interfaces/datamodel';
import { ControlService } from '../services/control.service';

@Component({
  selector: 'view.base',
  template: '',
})
export class ViewBase {

  @Input() control: any;
  @Input() category: any;
  @Input() room: any;

  @Input() name: string;

  public btnAction = ButtonAction;

  constructor(public controlService: ControlService) {
  }

  public updateDisplay(control: any) {
    this.controlService.updateDisplay(control);
  }

  public btn(action, $event, control) {
    console.log('btn');
    this.controlService.btn(action, $event, control);
  }

}
