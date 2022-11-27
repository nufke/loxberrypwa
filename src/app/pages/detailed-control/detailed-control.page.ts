import { Component, OnInit, ViewChild, ViewContainerRef, ComponentRef, QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoxBerry } from '../../providers/loxberry';
import { Control, Category, Room } from '../../interfaces/datamodel'
import { Subscription } from 'rxjs'

import { ViewBase } from '../../views/view.base';
import { ControlTextStateView } from '../../views/control-text-state/control-text-state.view';
import { ControlLightV2View } from '../../views/control-light-v2/control-light-v2.view';
import { ControlRadioView } from '../../views/control-radio/control-radio.view';
import { ControlSwitchView } from '../../views/control-switch/control-switch.view';
import { ControlSliderView } from '../../views/control-slider/control-slider.view';
import { ControlPushbuttonView } from '../../views/control-pushbutton/control-pushbutton.view';

@Component({
  selector: 'app-detailed-control',
  templateUrl: 'detailed-control.page.html',
  styleUrls: ['./detailed-control.page.scss'],
})
export class DetailedControlPage implements OnInit {
  @ViewChild('viewcontainer', { read: ViewContainerRef, static: true })

   public viewContainer: ViewContainerRef;
   public componentRef;

   public control : Control;
   public category : Category;
   public room : Room;

   private controlsSub: Subscription;
   private categoriesSub: Subscription;
   private roomsSub: Subscription;

   private ViewMap = {
     'info_only_analog': ControlTextStateView,
     'info_only_digital': ControlTextStateView,
     'info_only_text': ControlTextStateView,
     'text_state': ControlTextStateView,
     'light_controller_v2': ControlLightV2View,
     'radio': ControlRadioView,
     'switch': ControlSwitchView,
     'slider': ControlSliderView,
     'pushbutton': ControlPushbuttonView
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
       this.componentRef = this.viewContainer.createComponent(this.getControlView(control.type));
       (<ViewBase>this.componentRef.instance).control = control;
       (<ViewBase>this.componentRef.instance).category = category;
       (<ViewBase>this.componentRef.instance).room = room;
     }
   }

   private getControlView(type) {
     let view = this.ViewMap[type];
     if (view)
       return this.ViewMap[type];
     else
       return this.ViewMap['text_state'];
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
