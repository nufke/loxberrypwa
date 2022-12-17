import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LoxBerry } from '../../providers/loxberry';
import { Control, Category, Room } from '../../interfaces/datamodel';
import { Subscription } from 'rxjs';
import { DetailedControlBase } from '../detailed-control/detailed-control.base';

@Component({
  selector: 'app-controls',
  templateUrl: 'controls.page.html',
  styleUrls: ['controls.page.scss']
})
export class ControlsPage
  extends DetailedControlBase
  implements OnInit, OnDestroy {

  public controls: Control[] = [];
  public categories: Category[] = [];
  public rooms: Room[] = [];

  public items: any[];
  public labels: any[];

  public filtered_controls: Control[];
  private filtered_categories: string[];
  private filtered_rooms: string[];

  private domain: string;
  private uuid: string;
  private hwid: string;

  public page: any;

  public key: string;
  public icon_color: string;

  private controlsSub: Subscription;
  private categoriesSub: Subscription;
  private roomsSub: Subscription;

  constructor(
    public LoxBerryService: LoxBerry,
    private route: ActivatedRoute,
    public translate: TranslateService)
  {
    super(translate);

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

      this.filtered_categories = controls
        .map(item => item.category )
        //.filter((value, index, self) => self.indexOf(value) === index) // remove duplicates

      this.filtered_rooms = controls
        .map(item => item.room )
        //.filter((value, index, self) => self.indexOf(value) === index) // remove duplicates
    });

    this.categoriesSub = LoxBerryService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories
      .sort((a, b) => { return a.order - b.order || a.name.localeCompare(b.name); })
      .filter( item => this.filtered_categories.indexOf(item.name) > -1);

      if (this.domain === 'category') {
        this.page = categories.find( item => (item.uuid === this.uuid) && (item.hwid === this.hwid));
        this.filtered_controls = this.controls.filter( item => (item.category === this.page.uuid && item.is_visible ));
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
        this.page = rooms.find( item => (item.uuid === this.uuid) && (item.hwid === this.hwid));
        this.filtered_controls = this.controls.filter( item => (item.room === this.page.uuid && item.is_visible ));
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

  public filter(label: any) : Control[] {
    return this.filtered_controls.filter( resp => resp[this.key] === label.uuid );
  }

  public is_empty(label: any) : Boolean {
    return (this.filter(label).length > 0);
  }

}
