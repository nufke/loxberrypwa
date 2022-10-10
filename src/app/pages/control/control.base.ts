import {Component, Input} from '@angular/core';
import { Control } from '../../interfaces/datamodel'

@Component({
  selector: 'control.base',
  template: '',
})
export class ControlBase {

  @Input() control: Control;

  constructor() {}

}
