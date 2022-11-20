import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoxBerry } from '../../providers/loxberry';
import { Control, Category, Room } from '../../interfaces/datamodel'
import { Subscription } from 'rxjs'
import { ControllerBase } from '../control.views/controller.base';

var sprintf = require('sprintf-js').sprintf

@Component({
  selector: 'app-controls',
  templateUrl: 'controls.page.html',
  styleUrls: ['controls.page.scss']
})
export class ControlsPage
  extends ControllerBase
  implements OnInit, OnDestroy {

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
              private route: ActivatedRoute )
  {
    super(LoxBerryService);

    this.domain = this.route.snapshot.paramMap.get('domain'); // room or category
    this.uuid = this.route.snapshot.paramMap.get('uuid');     // uuid of room or category
    this.hwid = this.route.snapshot.paramMap.get('hwid');     // hwid of room or category

    if (this.domain === 'category')
      this.key = 'room';

    if (this.domain === 'room')
      this.key = 'category';

    this.controlsSub = LoxBerryService.getControls().subscribe((controls: Control[]) => {
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

    this.categoriesSub = LoxBerryService.getCategories().subscribe((categories: Category[]) => {
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

    this.roomsSub = LoxBerryService.getRooms().subscribe((rooms: Room[]) => {
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

  private updateControls(controls: Control[])
  {
    controls.forEach( item => {
      this.updateDisplay(item)
    });
  }

}
