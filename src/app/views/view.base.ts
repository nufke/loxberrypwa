import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Control, Subcontrol, Category, Room } from '../interfaces/datamodel'
import { DetailedControlBase } from '../pages/detailed-control/detailed-control.base';
import { LoxBerry } from '../providers/loxberry';

@Component({
  selector: 'view.base',
  template: '',
})
export class ViewBase extends DetailedControlBase {

  @Input() control: any;
  @Input() category: any;
  @Input() room: any;

  constructor(public LoxBerryService: LoxBerry)
  {
    super();
  }
}
