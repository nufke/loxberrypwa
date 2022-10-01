import { Component, OnInit, ViewChild, ViewContainerRef, ComponentRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoxBerry } from '../../providers/loxberry';
import { Control, Category, Room } from '../../interfaces/datamodel'
import { Subscription } from 'rxjs'

import { ControlBase } from './control.base';
import { ControlTextPage } from './control.text/control.text.page';
import { ControlLightPage } from './control.light/control.light.page';

@Component({
  selector: 'app-control',
  templateUrl: 'control.page.html',
  styleUrls: ['./control.page.scss'],
})
export class ControlPage {
 @ViewChild('container', { read: ViewContainerRef, static: true })

  control : any = [];
  controlname: string ='';

  private controlsSub: Subscription;

  private ControlTypeMap = {
    'text': ControlTextPage,
    'light': ControlLightPage,
/*
    'Pushbutton': PushPageView
    'InfoOnlyAnalog': TextView,
    'InfoOnlyDigital': TextView,
    'Switch': SwitchView,
    'Webpage': PushView,
    'Alarm': TextView,
    'SmokeAlarm': TextView,
    'Intercom': TextView,
    'Fronius': TextView,
    'Slider': SliderView,
    'CentralLightController': TextView,
    'Radio': RadioView,
    'UpDownDigital': UpDownView,
    'CentralJalousie': TextView,
    'Jalousie': UpDownView,
    'Daytimer': TextView,
    'IRoomController': TextView
    */
  }

  constructor(
    public LoxBerryService: LoxBerry,
    private viewContainerRef: ViewContainerRef,
    private route: ActivatedRoute )
  {
    const uuid = this.route.snapshot.paramMap.get('control_uuid');
    console.log("uuid: ", uuid);

    this.controlsSub = this.LoxBerryService.getControls().subscribe((controls: Control[]) => {
      this.control = controls.find( item => item.uuid === uuid );
      console.log("control: ", this.control.name);
    });

    this.loadControlComponent(this.control);
    console.log("control type: ", this.control.type);
    this.controlname = this.control.name;
  }

  async loadControlComponent(control: any) {
    const componentRef = this.viewContainerRef.createComponent(this.getControlType(control.type));
    (<ControlBase>componentRef.instance).control = control;
  }

  private getControlType(type) {
    return this.ControlTypeMap[type];
  }

}
