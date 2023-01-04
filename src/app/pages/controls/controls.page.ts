import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from "rxjs/operators";
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ControlService } from '../../services/control.service';
import { Control, Room, Category } from '../../interfaces/data.model';
import { ControlListVM } from '../../interfaces/view.model';
import { View } from '../../types/types';

@Component({
  selector: 'app-controls',
  templateUrl: 'controls.page.html',
  styleUrls: ['controls.page.scss']
})
export class ControlsPage
  implements OnInit {

  vm$: Observable<ControlListVM>;
  key: string;
  viewType = View;

  constructor(
    public translate: TranslateService,
    private route: ActivatedRoute,
    private controlService: ControlService
    )
  {
    this.initVM();
  }

  /**
   * Initialize view model
   *
   * The view model will contain room and category name instead of uuid
   */
  private initVM(): void {
    const domain = this.route.snapshot.paramMap.get('domain'); // room or category
    const uuid = this.route.snapshot.paramMap.get('uuid');     // uuid of room or category
    const hwid = this.route.snapshot.paramMap.get('hwid');     // hwid of room or category

    if (domain === 'category')
      this.key = 'room';
    if (domain === 'room')
      this.key = 'category';

    if (domain === 'category') {
      this.vm$ = combineLatest([
        this.controlService.controls$,
        this.controlService.categories$,
        this.controlService.rooms$,
      ]).pipe(
        map(([controls, categories, rooms]) => {
          controls = controls
            .filter(control => control.is_visible && control.category === uuid && control.hwid === hwid)
            .sort( (a, b) => ( a.order - b.order || a.name.localeCompare(b.name) ) );
          let filtered_rooms = controls.map(control => control.room);
          const vm: ControlListVM = {
            controls: controls,
            labels: rooms.filter( rooms => filtered_rooms.indexOf(rooms.uuid) > -1 )
                         .sort( (a, b) => ( a.order - b.order || a.name.localeCompare(b.name) ) ),
            page: categories.find( category => (category.uuid === uuid) && (category.hwid === hwid) )
          };
          return vm;
        })
      );
    }

    if (domain === 'room') {
      this.vm$ = combineLatest([
        this.controlService.controls$,
        this.controlService.categories$,
        this.controlService.rooms$,
      ]).pipe(
        map(([controls, categories, rooms]) => {
          controls = controls
            .filter(control => control.is_visible && control.room === uuid && control.hwid === hwid )
            .sort( (a, b) => ( a.order - b.order || a.name.localeCompare(b.name) ) );
          let filtered_categories = controls.map(control => control.category);
          const vm: ControlListVM = {
            controls: controls,
            labels: categories.filter( category => filtered_categories.indexOf(category.uuid) > -1 )
                              .sort( (a, b) => ( a.order - b.order || a.name.localeCompare(b.name) ) ),
            page: rooms.find( room => (room.uuid === uuid) && (room.hwid === hwid) )
          };
          return vm;
        })
      );
    }
  }

  ngOnInit() : void {
  }

  filter(label: Room | Category) : Observable<Control[]> {
    return this.vm$.pipe(
      map( items => items.controls
        .filter( resp => resp[this.key] === label.uuid )));
  }
}
