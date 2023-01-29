import { Component, OnInit, OnDestroy } from '@angular/core';
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
  implements OnInit, OnDestroy {

  vm$: Observable<ControlListVM>;
  key: string;
  viewType = View;
  isHome: boolean;

  constructor(
    public translate: TranslateService,
    private route: ActivatedRoute,
    private controlService: ControlService) {

  }

  ngOnInit() : void {
    this.initVM();
  }

  ngOnDestroy() : void {
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
      this.isHome = false;
      this.vm$ = combineLatest([
        this.controlService.controls$,
        this.controlService.categories$,
        this.controlService.rooms$,
      ]).pipe(
        map(([controls, categories, rooms]) => {
          controls = controls
            .filter(control => control.is_visible && control.category === uuid && control.hwid === hwid);
          let filtered_rooms = controls.map(control => control.room);
          const vm: ControlListVM = {
            controls: controls,
            favorites: controls.filter(control => control.is_favorite)
                               .sort( (a, b) => ( a.order[1] - b.order[1] || a.name.localeCompare(b.name) ) ),
            labels: rooms.filter( rooms => filtered_rooms.indexOf(rooms.uuid) > -1 )
                         .sort( (a, b) => ( a.name.localeCompare(b.name) ) ),
            page: categories.find( category => (category.uuid === uuid) && (category.hwid === hwid) )
          };
          return vm;
        })
      );
    }

    if (domain === 'room') {
      this.isHome = false;
      this.vm$ = combineLatest([
        this.controlService.controls$,
        this.controlService.categories$,
        this.controlService.rooms$,
      ]).pipe(
        map(([controls, categories, rooms]) => {
          controls = controls
            .filter(control => control.is_visible && control.room === uuid && control.hwid === hwid );
          let filtered_categories = controls.map(control => control.category);
          const vm: ControlListVM = {
            controls: controls,
            favorites: controls.filter(control => control.is_favorite)
                               .sort( (a, b) => ( a.order[1] - b.order[1] || a.name.localeCompare(b.name) ) ),
            labels: categories.filter( category => filtered_categories.indexOf(category.uuid) > -1 )
                              .sort( (a, b) => ( a.name.localeCompare(b.name) ) ),
            page: rooms.find( room => (room.uuid === uuid) && (room.hwid === hwid) )
          };
          return vm;
        })
      );
    }

    if (domain === null /* home */) {
      this.isHome = true;
      this.vm$ = this.controlService.controls$.pipe(
        map( controls => {
          controls = controls
          .filter( control => (control.order[2] > 0) && control.is_visible )
          .sort( (a, b) => ( a.order[2] - b.order[2] || a.name.localeCompare(b.name) ) );
          const vm: ControlListVM = {
            controls: null,
            favorites: controls,
            labels: null,
            page: { name: 'Home'}
          };
          return vm;
        })
      );
    }
  }

  filter_list(label: Room | Category) : Observable<Control[]> {
    return this.vm$.pipe(
      map( items => items.controls
        .filter( item => item[this.key] === label.uuid)
        .sort( (a, b) => ( a.order[0] - b.order[0] || a.name.localeCompare(b.name)))));
  }
}
