import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoxBerry } from '../../providers/loxberry';
import { Control } from '../../interfaces/datamodel'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-favorites',
  templateUrl: 'favorites.page.html',
  styleUrls: ['favorites.page.scss']
})
export class FavoritesPage implements OnInit, OnDestroy {

  public controls: Control[];
  public favorites: Control[];
  public user: string;

  private controlsSub: Subscription;

  constructor(
    public LoxBerryService: LoxBerry)
  {
    this.controls = [];

    this.controlsSub = this.LoxBerryService.getControls().subscribe((controls: Control[]) => {
      this.controls = controls;

      this.favorites = controls.filter(item => item.is_favorite)
        .sort((a, b) => { return a.name.localeCompare(b.name); });

      this.updateControls(controls);
    });
  }

  public ngOnInit() : void {
  }

  public ngOnDestroy() : void {
    if (this.controlsSub) {
      this.controlsSub.unsubscribe();
    }
  }

  private updateControls(controls: any)
  {
    controls.forEach( item => {
      this.updateControlState(item)
    });
  }

  private updateControlState(control: any) {
    if (control.state.default_color) // if defined
    control.state._current_color = control.icon.default_color;
    else
    control.state._current_color = "#5e5e5f";

    if (control.type === 'switch') {
      control.state._status_text = ''; // no status displayed
      if (control.state.value === '1') {
        control.state._toggle = true;
        if (control.icon.active_color) // if defined
        control.icon._current_color = control.icon.active_color;
        else control.icon._current_color = "primary";
      }
      else control.icon._current_color = control.icon.default_color;
    }

    if ((control.type === 'intercom') || (control.type === 'light') || (control.type === 'link') || (control.type === 'screen_c') ||
      (control.type === 'light_c')) {
        control.state._status_text = ''; // no status displayed
    }

    if (control.type === 'radio') {
      if (control.state.states) {
        let val = parseInt(control.state.value);
        control.state._status_text = control.state.states[val];
      }
    }
  }

  pushed_pulse($event, control) {
    $event.preventDefault();
    $event.stopPropagation();
    console.log('pushed', control);
    control.state.value = "pushed";
    this.LoxBerryService.sendMessage('control', control, 0);
  }

  pushed_light($event, control) {
    $event.preventDefault();
    $event.stopPropagation();
    console.log('pushed light', control);
  }

  pushed_radio_up($event, control) {
    this.pushed_radio($event, control, true)
  }

  pushed_radio_down($event, control) {
    this.pushed_radio($event, control, false)
  }

  pushed_radio($event, control, up) {
    $event.preventDefault();
    $event.stopPropagation();
    console.log('pushed radio', control);

    if (control.state.states) // process only if there are radio states
    {
      let val = parseInt(control.state.value);
      let min, max;
      if (up) { max = control.state.states.length-1; min = 0; }
        else { max = 0; min = control.state.states.length-1; }

      if (val == max)
        val = min;
      else
        if (up) val++;
        else val--;

      control.state.value = String(val);
      this.LoxBerryService.sendMessage('control', control, 1);
    }
  }

  pushed_up($event, control) {
    $event.preventDefault();
    $event.stopPropagation();
    console.log('pushed up', control);
    control.state.value = "up";
    this.LoxBerryService.sendMessage('control', control, 0);
  }

  pushed_down($event, control) {
    $event.preventDefault();
    $event.stopPropagation();
    console.log('pushed down', control);
    control.state.value = "down";
    this.LoxBerryService.sendMessage('control', control, 0);
  }

  pushed_plus($event, control) {
    $event.preventDefault();
    $event.stopPropagation();
    console.log('pushed plus', control);
    control.state.value = "plus";
    this.LoxBerryService.sendMessage('control', control, 0);
  }

  pushed_minus($event, control) {
    $event.preventDefault();
    $event.stopPropagation();
    console.log('pushed minus', control);
    control.state.value = "minus";
    this.LoxBerryService.sendMessage('control', control, 0);
  }

  toggle($event, control) {
    $event.preventDefault();
    $event.stopPropagation();

    if (control.state._toggle) control.state.value = '0';
    else control.state.value = '1';
    this.LoxBerryService.sendMessage('control', control, 1);
  }

}
