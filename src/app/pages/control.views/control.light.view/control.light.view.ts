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

  public segment: string = 'moods';

  constructor(
    private router: Router,
    public LoxBerryService: LoxBerry
  )
  {
    super(LoxBerryService);
  }

  ngOnInit() {
    this.updateDisplay(this.control);
  }

  updateSegment() {
    // Close any open sliding items when the schedule updates
  }

  radioGroupChange(event) {
    this.control.states.value = String(event.detail.value);
    this.mood_idx = event.detail.value;
    if (this.mood_idx > 0) {
      this.LoxBerryService.sendMessage(this.control, 'changeTo/' + String(this.mood_list[this.mood_idx].id));
    }
  }

}
