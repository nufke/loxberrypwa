import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoxBerry } from '../../providers/loxberry';
import { Control, Category, Room } from '../../interfaces/datamodel'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-controls',
  templateUrl: 'controls.page.html',
  styleUrls: ['controls.page.scss']
})
export class ControlsPage implements OnInit, OnDestroy {

  public controls: Control[] = [];
  public categories: Category[] = [];
  public rooms: Room[] = [];

  public items: any[];

  private filtered_categories: string[];
  private filtered_rooms: string[];

  private domain: string;
  private uuid: string;

  public itemName: string;
  public key: string;
  public icon_color: string;

  private controlsSub: Subscription;
  private categoriesSub: Subscription;
  private roomsSub: Subscription;

  constructor(public LoxBerryService: LoxBerry,
              private route: ActivatedRoute ) {

    this.domain = this.route.snapshot.paramMap.get('domain');
    this.uuid = this.route.snapshot.paramMap.get('uuid');

    if (this.domain === 'category') {
      this.key = 'room';
    }

    if (this.domain === 'room') {
      this.key = 'category';
    }

    this.controlsSub = this.LoxBerryService.getControls().subscribe((controls: Control[]) => {
      this.controls = controls;

      this.filtered_categories = controls
        .map(item => item.category )
        .filter((value, index, self) => self.indexOf(value) === index) // remove duplicates

      this.filtered_rooms = controls
        .map(item => item.room )
        .filter((value, index, self) => self.indexOf(value) === index) // remove duplicates

      this.updateControlState(controls);
    });

    this.categoriesSub = this.LoxBerryService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories
      .sort((a, b) => { return a.order - b.order || a.name.localeCompare(b.name); })
      .filter( item => this.filtered_categories.indexOf(item.name) > -1);

      if (this.domain === 'category')
        this.itemName = this.findUuid(categories, this.uuid);

      if (this.domain === 'room')
        this.items = categories;
    });

    this.roomsSub = this.LoxBerryService.getRooms().subscribe((rooms: Room[]) => {
      this.rooms = rooms
      .sort((a, b) => { return a.order - b.order || a.name.localeCompare(b.name); })
      .filter( item => this.filtered_rooms.indexOf(item.name) > -1);

      if (this.domain === 'room')
        this.itemName = this.findUuid(rooms, this.uuid);

      if (this.domain === 'category')
        this.items = rooms;
    });
  }

  public ngOnInit() : void {
  }

  public ngOnDestroy() : void {
    if (this.controlsSub) {
      this.controlsSub.unsubscribe();
    }
    if (this.categoriesSub) {
      this.categoriesSub.unsubscribe();
    }
    if (this.roomsSub) {
      this.roomsSub.unsubscribe();
    }
  }

  private findUuid(obj: any, uuid: string) {
    for(let i = 0; i < obj.length; i++) {
      if (obj[i].uuid === uuid) return obj[i].name;
    }
    return; // uuid not found
  }

  public filter(item: any, label: any) : Control[] {
    let filtered_items =  item.filter( resp => { return (resp[this.domain] == this.itemName) &&
      (resp[this.key] == label.name ) && (resp['is_visible'] == true) });
    return filtered_items.sort( (a, b) => { return a.order - b.order || a.name.localeCompare(b.name) });
}

  public is_empty(item: any, label: any) : Boolean {
    return (this.filter(item, label).length > 0);
  }

  private updateControlState(control: any)
  {
    control.forEach( item => {

      if (item.state.default_color) // if defined
        item.state._current_color = item.icon.default_color;
      else
        item.state._current_color = "#5e5e5f";

      if (item.type === 'switch') {
        item.state._status_text = ''; // no status displayed
        if (item.state.value === '1')
        {
          if (item.icon.active_color) // if defined
            item.icon._current_color = item.icon.active_color;
            else item.icon._current_color = "primary";
        }
        else item.icon._current_color = item.icon.default_color;
      }

      if ((item.type === 'intercom') || (item.type === 'light') || (item.type === 'link') || (item.type === 'screen_c') ||
          (item.type === 'light_c')) {
        item.state._status_text = ''; // no status displayed
      }

      if (item.type === 'radio') {
        if (item.state.states) {
          let val = parseInt(item.state.value);
          item.state._status_text = item.state.states[val];
        }
      }
    });
  }

  pushed($event, control) {
    $event.preventDefault();
    $event.stopPropagation();
    console.log('pushed', control);
    control.state.value = "pushed";
    this.LoxBerryService.sendMessage(control);
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
      this.LoxBerryService.sendMessage(control);
    }
  }

  pushed_up($event, control) {
    $event.preventDefault();
    $event.stopPropagation();
    console.log('pushed up', control);
    control.state.value = "up";
    this.LoxBerryService.sendMessage(control);
  }

  pushed_down($event, control) {
    $event.preventDefault();
    $event.stopPropagation();
    console.log('pushed down', control);
    control.state.value = "down";
    this.LoxBerryService.sendMessage(control);
  }

  pushed_plus($event, control) {
    $event.preventDefault();
    $event.stopPropagation();
    console.log('pushed plus', control);
    control.state.value = "plus";
    this.LoxBerryService.sendMessage(control);
  }

  pushed_minus($event, control) {
    $event.preventDefault();
    $event.stopPropagation();
    console.log('pushed minus', control);
    control.state.value = "minus";
    this.LoxBerryService.sendMessage(control);
  }

  toggle($event, control) {
    $event.preventDefault();
    $event.stopPropagation();

    if (control.state.value === '1') {
      control.state.value = '0';
      control.icon._active_color = control.icon.color;
    }
    else {
      control.state.value = '1';
      control.icon._active_color = "primary";
    }
    this.LoxBerryService.sendMessage(control);
  }

}