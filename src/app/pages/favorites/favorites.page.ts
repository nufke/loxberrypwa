import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoxBerry } from '../../providers/loxberry';
import { Control, Category, Room  } from '../../interfaces/datamodel'
import { Subscription } from 'rxjs'
import { ControllerBase } from '../control.views/controller.base';

@Component({
  selector: 'app-favorites',
  templateUrl: 'favorites.page.html',
  styleUrls: ['favorites.page.scss']
})
export class FavoritesPage
  extends ControllerBase
  implements OnInit, OnDestroy {

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
    super(LoxBerryService);

    this.controls = [];

    this.controlsSub = LoxBerryService.getControls().subscribe((controls: Control[]) => {
      this.controls = controls;

      this.favorites = controls.filter(item => item.is_favorite)
        .sort( (a, b) => { return a.order - b.order || a.name.localeCompare(b.name) })

      this.updateControls(controls);
    });

    this.categoriesSub = LoxBerryService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });

    this.roomsSub = LoxBerryService.getRooms().subscribe((rooms: Room[]) => {
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
      this.updateDisplay(item)
    });
  }

  public get(room_uuid: string, category_uuid: string): string {
    let room = this.rooms.find( item => { return (item.uuid == room_uuid) } );
    let category = this.categories.find( item => { return (item.uuid == category_uuid) } );
    return room.name + " • " + category.name;
  }

}
