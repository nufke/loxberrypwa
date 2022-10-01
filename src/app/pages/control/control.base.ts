import {Component, Input} from '@angular/core';

@Component({
  selector: 'control.base',
  template: '',
})
export class ControlBase {

  @Input() control: any = [];

  constructor() {}

}
