import { Component } from '@angular/core';
import { ViewBase } from '../view.base';

@Component({
  selector: 'app-text-view',
  templateUrl: 'text.view.html',
  styleUrls: ['./text.view.scss'],
})
export class TextView
  extends ViewBase {

  constructor() {
    super();
  }

}
