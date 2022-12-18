import { Component } from '@angular/core';
import { TextView } from '../text/text.view';

@Component({
  selector: 'control-pushbutton-view',
  templateUrl: 'control-pushbutton.view.html',
  styleUrls: ['./control-pushbutton.view.scss'],
})
export class ControlPushbuttonView
  extends TextView {

  constructor() {
    super();
  }

}
