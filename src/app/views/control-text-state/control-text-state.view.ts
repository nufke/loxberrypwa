import { Component } from '@angular/core';
import { TextView } from '../text/text.view';

@Component({
  selector: 'control-text-state-view',
  templateUrl: 'control-text-state.view.html',
  styleUrls: ['./control-text-state.view.scss'],
})
export class ControlTextStateView
  extends TextView {

  constructor() {
    super();
  }

}
