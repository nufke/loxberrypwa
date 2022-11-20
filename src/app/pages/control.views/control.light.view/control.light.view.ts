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

  public mood_list = [];
  public segment: string = 'moods';

  constructor(
    private router: Router,
    public LoxBerryService: LoxBerry
  )
  {
    super(LoxBerryService);
  }

  ngOnInit() {
    this.mood_list = [{name:'Manual', id:-1}].concat(JSON.parse(this.control.states.mood_list));
    this.updateControl();
  }

  public updateControl() {
    let id = JSON.parse(this.control.states.active_moods)[0];

    let mood = this.mood_list.find( item => { return item.id == id } );
    if (mood) this.control.display.text = mood.name;
    if (id > 0) this.control.display.color = "#69c350"; // primary
  }

  updateSegment() {
    // Close any open sliding items when the schedule updates
  }

  radioGroupChange(event) {
    this.control.states.value = String(event.detail.value);
    let mood = this.mood_list[event.detail.value];
    if (mood.id > 0) {
      this.LoxBerryService.sendMessage(this.control, '/cmd', 'changeTo/'+String(mood.id), 0);
    }

  }

  to_string(i: Number) : string {
    return String(i);
  }
}
