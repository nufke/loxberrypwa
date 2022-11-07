import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ControlViewBase } from '../control.view.base';
import { LoxBerry } from '../../../providers/loxberry';

@Component({
  selector: 'app-control-light',
  templateUrl: 'control.light.view.html',
  styleUrls: ['./control.light.view.scss'],
})
export class ControlLightView extends ControlViewBase {

  segment = 'moods';
  constructor(
    private router: Router,
    public LoxBerryService: LoxBerry
  )
  {
    super();
  }

  ngOnInit() {
  }

  updateSegment() {
    // Close any open sliding items when the schedule updates
  }

  radioGroupChange(event) {
    this.control.state.value = String(event.detail.value);
    this.LoxBerryService.sendMessage(this.control, '/state/value', event.detail.value, 1);
  }

  to_string(i: Number) : string {
    return String(i);
  }
}
