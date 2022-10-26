import { Component, OnInit, ViewChild, ViewContainerRef, ComponentRef, QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoxBerry } from '../../providers/loxberry';
import { Control, Category, Room } from '../../interfaces/datamodel'
import { Subscription } from 'rxjs'

import { ControlViewBase } from './control.view.base';
import { ControlTextView } from './control.text.view/control.text.view';
import { ControlLightView } from './control.light.view/control.light.view';
import { ControlRadioView } from './control.radio.view/control.radio.view';
import { ControlSwitchView } from './control.switch.view/control.switch.view';
import { ControlSliderView } from './control.slider.view/control.slider.view';

@Component({
  selector: 'app-control',
  templateUrl: 'control.view.html',
  styleUrls: ['./control.view.scss'],
})
export class ControlView implements OnInit {
 @ViewChild('container', { read: ViewContainerRef, static: true })

  public viewContainer: ViewContainerRef;
  public componentRef;

  public control : Control;
  public category : Category;
  public room : Room;

  private controlsSub: Subscription;
  private categoriesSub: Subscription;
  private roomsSub: Subscription;

  private ControlTypeMap = {
    'text': ControlTextView,
    'light': ControlLightView,
    'radio': ControlRadioView,
    'switch': ControlSwitchView,
    'slider': ControlSliderView,
  }

  constructor(
    public LoxBerryService: LoxBerry,
    private route: ActivatedRoute
    )
  {
    const uuid = this.route.snapshot.paramMap.get('control_uuid');

    this.controlsSub = this.LoxBerryService.getControls().subscribe((controls: Control[]) => {
      this.control = controls.find( item => item.uuid === uuid );
    });

    this.categoriesSub = this.LoxBerryService.getCategories().subscribe((categories: Category[]) => {
      this.category = categories.find( item => item.uuid === this.control.category );
    });

    this.roomsSub = this.LoxBerryService.getRooms().subscribe((rooms: Room[]) => {
      this.room = rooms.find( item => item.uuid === this.control.room );
    });
  }

  async loadControlComponent(control: Control, category : Category, room : Room ) {
    if (!this.componentRef) { // only create if dynamic view does not exist
      this.componentRef = this.viewContainer.createComponent(this.getControlType(control.type));
      (<ControlViewBase>this.componentRef.instance).control = control;
      (<ControlViewBase>this.componentRef.instance).category = category;
      (<ControlViewBase>this.componentRef.instance).room = room;
    }
  }

  private getControlType(type) {
    return this.ControlTypeMap[type];
  }

  public ngOnInit() : void {
    this.loadControlComponent(this.control, this.category, this.room);
  }

  public ngOnDestroy() : void {
    this.viewContainer.clear(); // remove dynamic view from memory
    this.componentRef = -1;

    if (this.controlsSub)
      this.categoriesSub.unsubscribe();
    if (this.categoriesSub)
      this.controlsSub.unsubscribe();
    if (this.roomsSub)
      this.roomsSub.unsubscribe();
  }

}
