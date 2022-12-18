import { Component } from '@angular/core';
import { TextView } from '../text/text.view';

@Component({
  selector: 'control-radio-view',
  templateUrl: 'control-radio.view.html',
  styleUrls: ['./control-radio.view.scss'],
})
export class ControlRadioView
  extends TextView {

  public segment: string = 'moods';

  constructor() {
    super();
  }

}
