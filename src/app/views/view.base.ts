import {Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Control, Category, Room } from '../interfaces/datamodel'
import { DetailedControlBase } from '../pages/detailed-control/detailed-control.base';
import { LoxBerry } from '../providers/loxberry';

@Component({
  selector: 'view.base',
  template: '',
})
export class ViewBase extends DetailedControlBase {

  @Input() control: Control;
  @Input() category: Category;
  @Input() room: Room;

  constructor(public LoxBerryService: LoxBerry)
  {
    super()
  }

}
