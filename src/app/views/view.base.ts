import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
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

  @Input() name: string;

  constructor(public translate: TranslateService)
  {
    super(translate);
  }
}
