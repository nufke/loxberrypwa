import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from "rxjs/operators";
import { IonContent } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ControlService } from '../../services/control.service';
import { RoomListVM } from '../../interfaces/view.model';

@Component({
  selector: 'app-rooms',
  templateUrl: 'rooms.page.html',
  styleUrls: ['rooms.page.scss']
})
export class RoomsPage
  implements OnInit {

  @ViewChild(IonContent, { static: false }) content: IonContent;

  public vm$: Observable<RoomListVM>;

  constructor(
    public translate: TranslateService,
    private controlService: ControlService)
  {
    this.initVM();
  }

  private initVM() : void {
    this.vm$ =  combineLatest([
      this.controlService.controls$,
      this.controlService.rooms$
      ]).pipe(
      map( ([controls, rooms]) => {
        controls = controls
        .filter( control => control.is_visible );
        let filtered_rooms = controls.map(control => control.room );
        rooms = rooms
          .filter( room => room.is_visible && filtered_rooms.indexOf(room.uuid) > -1)
          // TODO remove duplicates?
          //.filter((value, index, self) => self.indexOf(value) === index) // TODO remove duplicates
          //.filter((value, index, self) => index === self.findIndex((t) => ( t.name === value.name ))) // remove items with duplicate names
          .sort( (a, b) => ( a.order - b.order || a.name.localeCompare(b.name) ) );
          const vm: RoomListVM = {
            rooms: rooms
          };
          return vm;
      })
    );
  }

  ngOnInit() : void {
  }

  public ionViewWillEnter() : void {
    this.content.scrollToTop();
  }
}
