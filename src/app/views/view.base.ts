import {Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Control, Category, Room } from '../interfaces/datamodel'
import { DetailedControlBase } from '../pages/detailed-control/detailed-control.base';
import { LoxBerry } from '../providers/loxberry';

@Component({
  selector: 'view.base',
  template: '',
})
export class ViewBase extends DetailedControlBase {

  @Input() control: Control;
  @Input() category: Category;
  @Input() room: Room;

  constructor(public LoxBerryService: LoxBerry)
  {
    super()
  }

}

/*
export class ViewBase extends DetailedControlBase {

  public controls : Control[];
  public categories : Category[];
  public rooms : Room[];

  public control : Control;
  public category : Category;
  public room : Room;

  private controlsSub: Subscription;
  private categoriesSub: Subscription;
  private roomsSub: Subscription;

  @Input() set ctrl(inp: any) {
    if (inp !== undefined && inp !== null) {
      this.control = inp;
      this.category = this.categories.find( item => { return ((item.uuid === this.control.category) && (item.hwid === this.control.hwid)) });
      this.room = this.rooms.find( item => { return ((item.uuid === this.control.room) && (item.hwid === this.control.hwid)) });
    }
  }

  constructor(public LoxBerryService: LoxBerry)
  {
    super();

    this.controlsSub = this.LoxBerryService.getControls().subscribe((controls: Control[]) => {
      if (this.controls)
        this.control = this.controls.find( item => { return ((item.uuid === this.control.uuid) && (item.hwid === this.control.hwid)) });
    });

    this.categoriesSub = this.LoxBerryService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
      if (this.controls)
        this.category = this.categories.find( item => { return ((item.uuid === this.control.category) && (item.hwid === this.control.hwid)) });
    });

    this.roomsSub = this.LoxBerryService.getRooms().subscribe((rooms: Room[]) => {
      this.rooms = rooms;
      if (this.controls)
        this.room = this.rooms.find( item => { return ((item.uuid === this.control.room) && (item.hwid === this.control.hwid)) });
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

}
*/