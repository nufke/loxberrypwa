import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoxBerry } from '../../providers/loxberry';
import { Control, Category, Room  } from '../../interfaces/datamodel'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-favorites',
  templateUrl: 'favorites.page.html',
  styleUrls: ['favorites.page.scss']
})
export class FavoritesPage implements OnInit, OnDestroy {

  public controls: Control[] = [];
  public categories: Category[] = [];
  public rooms: Room[] = [];

  public favorites: Control[];
  public user: string;

  private controlsSub: Subscription;
  private categoriesSub: Subscription;
  private roomsSub: Subscription;

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

    this.categoriesSub = this.LoxBerryService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });

    this.roomsSub = this.LoxBerryService.getRooms().subscribe((rooms: Room[]) => {
      this.rooms = rooms;
    });

  }

  public ngOnInit() : void {
  }

  public ngOnDestroy() : void {
    if (this.controlsSub)
      this.controlsSub.unsubscribe();

    if (this.categoriesSub)
      this.categoriesSub.unsubscribe();

    if (this.roomsSub)
      this.roomsSub.unsubscribe();
  }

  private updateControls(controls: Control[])
  {
    controls.forEach( item => {
      this.updateControlState(item)
    });
  }

  public get(room_uuid: string, category_uuid: string): string {
    let room = this.rooms.find( item => { return (item.uuid == room_uuid) } );
    let category = this.categories.find( item => { return (item.uuid == category_uuid) } );
    return room.name + " • " + category.name;
  }

  private updateControlState(control: Control) {

    if (control.type === 'switch') {
      control.state._display_text = ''; // no status displayed
      if (control.state.value === "1") {
        control.state['_toggle'] = true;
        control.icon.color = "primary";
      }
      else {
        control.state['_toggle'] = false;
        control.icon.color = "#5e5e5f"; // TODO select from color palette
      }
    }
    if ((control.type === 'intercom') || (control.type === 'light') || (control.type === 'link') || (control.type === 'screen_c') ||
      (control.type === 'light_c')) {
        control.state._display_text = ''; // no status displayed
    }

    if (control.type === 'radio') {
      let val = parseInt(control.state.value);
      let names = control.state['list_names'];
      if (val && names)
        control.state._display_text = names[val];
    }
  }

  pushed_pulse($event, control) {
    $event.preventDefault();
    $event.stopPropagation();
    console.log('pushed', control);
    control.state.value = "pushed";
    this.LoxBerryService.sendMessage(control, '/state/value', control.state.value, 0);
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

    if (control.state.list_names) // process only if there are radio list names
    {
      let val = parseInt(control.state.value);
      let min, max;
      if (up) { max = control.state.list_names.length-1; min = 0; }
        else { max = 0; min = control.state.list_names.length-1; }

      if (val == max)
        val = min;
      else
        if (up) val++;
        else val--;

      control.state.value = String(val);
      this.LoxBerryService.sendMessage(control, '/state/value', control.state.value, 1);
    }
  }

  pushed_up($event, control) {
    $event.preventDefault();
    $event.stopPropagation();
    console.log('pushed up', control);
    control.state.value = "up";
    this.LoxBerryService.sendMessage(control, '/state/value', control.state.value, 0);
  }

  pushed_down($event, control) {
    $event.preventDefault();
    $event.stopPropagation();
    console.log('pushed down', control);
    control.state.value = "down";
    this.LoxBerryService.sendMessage(control, '/state/value', control.state.value, 0);
  }

  pushed_plus($event, control) {
    $event.preventDefault();
    $event.stopPropagation();
    console.log('pushed plus', control);
    control.state.value = "plus";
    this.LoxBerryService.sendMessage(control, '/state/value', control.state.value, 0);
  }

  pushed_minus($event, control) {
    $event.preventDefault();
    $event.stopPropagation();
    console.log('pushed minus', control);
    control.state.value = "minus";
    this.LoxBerryService.sendMessage(control, '/state/value', control.state.value, 0);
  }

  toggle($event, control) {
    $event.preventDefault();
    $event.stopPropagation();

    if (control.state._toggle) {
      control.state.value = "0";
      control.icon.color = "#5e5e5f"; // TODO select from color palette
    }
    else {
      control.state.value = "1";
      control.icon.color = "primary";
    }

    this.LoxBerryService.sendMessage(control, '/state/value', control.state.value, 1);
    this.LoxBerryService.sendMessage(control, '/icon/color', control.icon.color, 1);
  }

  get_color(control: Control) : string {
    var color: string;
    if (control.type === "radio") {
      let val = parseInt(control.state.value);
      let colors = control.state['list_colors'];
      if (val && colors)
        color = colors[val]
    }

    if (control.type === "text")
      color = control.state['color'];

    if (!color)
      color = "#5e5e5f"; // TODO select from color palette

    return color;
  }

}
