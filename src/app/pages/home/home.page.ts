import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { LoxBerryService } from '../../services/loxberry.service';
import { ControlService } from '../../services/control.service';
import { Control, Category, Room, ButtonAction } from '../../interfaces/datamodel';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage
  implements OnInit, OnDestroy {

  public btnAction = ButtonAction;

  public controls: Control[] = [];
  public categories: Category[] = [];
  public rooms: Room[] = [];

  public favorites: Control[];
  public user: string;

  private controlsSub: Subscription;
  private categoriesSub: Subscription;
  private roomsSub: Subscription;

  constructor(
    public loxBerryService: LoxBerryService,
    public translate: TranslateService,
    public controlService: ControlService)
  {
    this.controlsSub = loxBerryService.getControls().subscribe((controls: Control[]) => {
      this.controls = controls;

      this.favorites = controls.filter(item => item.is_favorite)
        .sort( (a, b) => { return a.order - b.order || a.name.localeCompare(b.name) })

      this.updateControls(controls);
    });

    this.categoriesSub = loxBerryService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });

    this.roomsSub = loxBerryService.getRooms().subscribe((rooms: Room[]) => {
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
      this.controlService.updateDisplay(item);
    });
  }

  public get(room_uuid: string, category_uuid: string): string {
    let room = this.rooms.find( item => { return (item.uuid == room_uuid) } );
    let category = this.categories.find( item => { return (item.uuid == category_uuid) } );
    return room.name + " • " + category.name;
  }

  public btn(action, $event, control) {
    this.controlService.btn(action, $event, control)
  }

}
