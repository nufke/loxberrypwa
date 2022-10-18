import {Component, Input} from '@angular/core';
import { Control, Category, Room } from '../../interfaces/datamodel'

@Component({
  selector: 'control.base',
  template: '',
})
export class ControlBase {

  @Input() control: Control;
  @Input() category: Category;
  @Input() room: Room;

  constructor()
  {
  }

}
