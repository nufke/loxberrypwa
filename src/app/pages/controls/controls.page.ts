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
  public labels: any[];

  private filtered_categories: string[];
  private filtered_rooms: string[];

  private domain: string;
  private uuid: string;
  private hwid: string;

  public page: Control;

  public key: string;
  public icon_color: string;

  private controlsSub: Subscription;
  private categoriesSub: Subscription;
  private roomsSub: Subscription;

  constructor(public LoxBerryService: LoxBerry,
              private route: ActivatedRoute ) {

    this.domain = this.route.snapshot.paramMap.get('domain'); // room or category
    this.uuid = this.route.snapshot.paramMap.get('uuid');     // uuid of room or category
    this.hwid = this.route.snapshot.paramMap.get('hwid');     // hwid of room or category

    if (this.domain === 'category')
      this.key = 'room';

    if (this.domain === 'room')
      this.key = 'category';

    this.controlsSub = this.LoxBerryService.getControls().subscribe((controls: Control[]) => {
      this.controls = controls
      .sort( (a, b) => { return a.order - b.order || a.name.localeCompare(b.name) })
      .filter( item => item.is_visible === true);

      this.filtered_categories = controls
        .map(item => item.category )
        .filter((value, index, self) => self.indexOf(value) === index) // remove duplicates

      this.filtered_rooms = controls
        .map(item => item.room )
        .filter((value, index, self) => self.indexOf(value) === index) // remove duplicates

      this.updateControls(controls);
    });

    this.categoriesSub = this.LoxBerryService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories
      .sort((a, b) => { return a.order - b.order || a.name.localeCompare(b.name); })
      .filter( item => this.filtered_categories.indexOf(item.name) > -1);

      if (this.domain === 'category') {
        this.page = this.findObj(categories, this.hwid, this.uuid);
        this.items = categories;
      }

      if (this.domain === 'room')
        this.labels = categories;
    });

    this.roomsSub = this.LoxBerryService.getRooms().subscribe((rooms: Room[]) => {
      this.rooms = rooms
      .sort((a, b) => { return a.order - b.order || a.name.localeCompare(b.name); })
      .filter( item => this.filtered_rooms.indexOf(item.name) > -1);

      if (this.domain === 'room') {
        this.page = this.findObj(rooms, this.hwid, this.uuid);
        this.items = rooms;
      }

      if (this.domain === 'category')
        this.labels = rooms;
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

  private findName(obj: any, uuid: string): Control {
    return obj.find( item => { return (item.uuid == uuid) } );
  }

  private findObj(obj: any, hwid: string, uuid: string): Control {
    return obj.find( item => { return (item.uuid == uuid) && (item.hwid == hwid) } );
  }

  public filter(item: any, label: any) : Control[] {
    return item.filter( resp => { return (resp[this.key] === label.uuid) &&
      (this.findName(this.items, resp[this.domain]).name === this.page.name)
    });
  }

  public is_empty(item: any, label: any) : Boolean {
    return (this.filter(item, label).length > 0);
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

    control.icon._current_href = control.icon.default_href;

    if (control.type === 'switch') {
      control.state._status_text = ''; // no status displayed
      if (control.state.value === "1") {
        control.state._toggle = true;
        if (control.icon.active_color) // if defined
          control.icon._current_color = control.icon.active_color;
        else control.icon._current_color = "primary";
        if (control.icon.active_href) // if defined
          control.icon._current_href = control.icon.active_href
      }
      else {
        control.state._toggle = false;
      }
    }

    if ((control.type === 'intercom') || (control.type === 'light') || (control.type === 'link') || (control.type === 'screen_c') ||
      (control.type === 'light_c')) {
        control.state._status_text = ''; // no status displayed
    }

    if (control.type === 'radio') {
      if (control.state.list_names) {
        let val = parseInt(control.state.value);
        control.state._status_text = control.state.list_names[val];
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