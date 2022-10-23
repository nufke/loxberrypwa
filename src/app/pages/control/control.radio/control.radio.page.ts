import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ControlBase } from '../control.base';
import { LoxBerry } from '../../../providers/loxberry';

@Component({
  selector: 'app-control-radio',
  templateUrl: 'control.radio.page.html',
  styleUrls: ['./control.radio.page.scss'],
})
export class ControlRadioPage extends ControlBase {

  constructor(
    private router: Router,
    public LoxBerryService: LoxBerry
  )
  {
    super();
  }

  ngOnInit() {
  }

  radioGroupChange(event) {
    this.control.state.value = String(event.detail.value);
    this.LoxBerryService.sendMessage(this.control, '/state/value', event.detail.value, 1);
  }

  to_string(i: Number) : string {
    return String(i);
  }
}
