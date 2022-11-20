import {Component, Input} from '@angular/core';
import { Control, Category, Room } from '../../interfaces/datamodel'
import { LoxBerry } from '../../providers/loxberry';
import { ControllerBase } from '../control.views/controller.base';

@Component({
  selector: 'control.base',
  template: '',
})
export class ControlViewBase extends ControllerBase {

  @Input() control: Control;
  @Input() category: Category;
  @Input() room: Room;

  constructor(public LoxBerryService: LoxBerry)
  {
    super(LoxBerryService)
  }

}
