import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { LoxBerryService } from '../../services/loxberry.service';
import { Control, Room } from '../../interfaces/datamodel';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rooms',
  templateUrl: 'rooms.page.html',
  styleUrls: ['rooms.page.scss']
})
export class RoomsPage implements OnInit, OnDestroy {

  @ViewChild(IonContent, { static: false }) content: IonContent;

  private filtered_rooms: string[];
  public rooms: Room[] = [];

  private controlsSub: Subscription;
  private roomsSub: Subscription;

  constructor(public loxBerryService: LoxBerryService) {

    this.controlsSub = this.loxBerryService.getControls().subscribe((controls: Control[]) => {

      this.filtered_rooms = controls
        .map(item => item.room )
        .filter((value, index, self) => self.indexOf(value) === index) // remove duplicates
    });

    this.roomsSub = this.loxBerryService.getRooms().subscribe((rooms: Room[]) => {
      this.rooms = rooms
        .sort((a, b) => { return a.order - b.order || a.name.localeCompare(b.name); }) // sort A-Z
        .filter( item => this.filtered_rooms.indexOf(item.uuid) > -1)
        .filter((value, index, self) => index === self.findIndex((t) => ( t.name === value.name ))) // remove items with duplicate names
      });
  }

  public ngOnInit() : void {
  }

  public ngOnDestroy() : void {
    if (this.controlsSub) {
      this.controlsSub.unsubscribe();
    }
    if (this.roomsSub) {
      this.roomsSub.unsubscribe();
    }
  }

  public ionViewWillEnter() : void {
    this.content.scrollToTop();
  }
}
