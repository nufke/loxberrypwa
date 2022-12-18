import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'view.base',
  template: '',
})
export class ViewBase {

  @Input() control: any;
  @Input() category: any;
  @Input() room: any;

  @Input() name: string;

  constructor() {}

}
