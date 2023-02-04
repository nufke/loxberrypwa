import { Component, OnInit, OnDestroy, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Control, Subcontrol, Room } from '../../interfaces/data.model';
import { ControlService } from '../../services/control.service';
import { View } from '../../types/types';
import { ControlTextStateView } from '../../views/control-text-state/control-text-state.view';
import { ControlLightV2View } from '../../views/control-light-v2/control-light-v2.view';
import { ControlCentralLightView } from '../../views/control-central-light/control-central-light.view';
import { ControlRadioView } from '../../views/control-radio/control-radio.view';
import { ControlSwitchView } from '../../views/control-switch/control-switch.view';
import { ControlSliderView } from '../../views/control-slider/control-slider.view';
import { ControlPushbuttonView } from '../../views/control-pushbutton/control-pushbutton.view';
import { ControlColorPickerV2View } from '../../views/control-color-picker-v2/control-color-picker-v2.view';
import { ControlIRCView } from '../../views/control-irc/control-irc.view';
import { ControlUpDownDigitalView } from '../../views/control-up-down-digital/control-up-down-digital.view';
import { ControlJalousieView } from '../../views/control-jalousie/control-jalousie.view';
import { ControlWebpageView } from '../../views/control-webpage/control-webpage.view';

@Component({
  selector: 'app-detailed-control',
  templateUrl: 'detailed-control.page.html',
  styleUrls: ['./detailed-control.page.scss']
})
export class DetailedControlPage
  implements OnInit, OnDestroy {

  @ViewChild('viewcontainer', { read: ViewContainerRef, static: true })

  viewContainer: ViewContainerRef;
  componentRef;
  viewType = View;

  control: Control;
  rooms: Room[];
  subcontrol: Subcontrol;
  page_name: string;

  private controlSubscription: Subscription;
  private roomSubscription: Subscription;

  // TODO, merge/move with IRC component
  private irc_mode = [
    { id: 0, name: 'Automatic' },
    { id: 1, name: 'Automatic (currently heating)' },
    { id: 2, name: 'Automatic (currently cooling)' },
    { id: 3, name: 'Automatic heating' },
    { id: 4, name: 'Automatic cooling' },
    { id: 5, name: 'Manual heating' },
    { id: 6, name: 'Manual cooling' }
  ];

  private ViewMap = {
    'InfoOnlyAnalog': ControlTextStateView,
    'InfoOnlyDigital': ControlTextStateView,
    'InfoOnlyText': ControlTextStateView,
    'TextState': ControlTextStateView,
    'LightControllerV2': ControlLightV2View,
    "CentralLightController": ControlCentralLightView,
    'Radio': ControlRadioView,
    'Switch': ControlSwitchView,
    'Slider': ControlSliderView,
    'Pushbutton': ControlPushbuttonView,
    'ColorPickerV2': ControlColorPickerV2View,
    'IRoomController': ControlIRCView,
    'UpDownDigital': ControlUpDownDigitalView,
    'Jalousie': ControlJalousieView,
    'Webpage': ControlWebpageView
  }

  constructor(
    public translate: TranslateService,
    private route: ActivatedRoute,
    private controlService: ControlService ) {
    this.initVM();
  }

  ngOnInit(): void {
    this.loadControlComponent(this.control, this.subcontrol);
  }

  ngOnDestroy(): void {
    this.viewContainer.clear(); // remove dynamic view from memory
    this.componentRef = -1;
    this.controlSubscription.unsubscribe();
    this.roomSubscription.unsubscribe();
  }

  private initVM(): void {
    const control_hwid = this.route.snapshot.paramMap.get('control_hwid');
    const control_uuid = this.route.snapshot.paramMap.get('control_uuid');
    const subcontrol_uuid = this.route.snapshot.paramMap.get('subcontrol_uuid');
    const subcontrol_uuid_ext = this.route.snapshot.paramMap.get('subcontrol_uuid_ext');

    this.roomSubscription = this.controlService.rooms$.subscribe(
      rooms => { this.rooms = rooms;
    });

    this.controlSubscription = this.controlService.getControl$(control_hwid, control_uuid).subscribe(
      control => {
        this.control = control;
        let room = this.rooms.find( room => (room.uuid === control.room) && (room.hwid === control.hwid));

        switch (control.type) {
          case 'IRoomController':
            this.page_name = this.translate.instant(this.irc_mode.find(item => item.id == control.states.mode ).name);
            break;
          case 'LightControllerV2':
            /* TODO: Loxone replaces default controller name with room name, should we keep it? */
            this.page_name = (control.name === this.translate.instant('Lightcontroller') &&
              room != undefined) ? room.name : control.name;
            break;
          default:
            this.page_name = control.name;
        }
      }
    );

    if (subcontrol_uuid != null) {
      this.controlService.getSubcontrol$(control_hwid, control_uuid, subcontrol_uuid + '/' + subcontrol_uuid_ext).subscribe(
        subcontrol => {
          this.subcontrol = subcontrol;
          this.page_name = subcontrol.name;
        }
      );
    }
  }

  private loadControlComponent(control: Control, subcontrol: Subcontrol) {
    if (!this.componentRef) { // only create if dynamic view does not exist yet
      if (subcontrol == null) {
        this.componentRef = this.viewContainer.createComponent(this.getControlView(control.type));
      }
      else {
        this.componentRef = this.viewContainer.createComponent(this.getControlView(subcontrol.type));
      }
      (this.componentRef.instance).control = control;
      (this.componentRef.instance).view = View.DETAILED;
      if (subcontrol != null) { // for subcontrols we pass this.
        (this.componentRef.instance).subcontrol = subcontrol;
      }
    }
  }

  private getControlView(type) {
    let view = this.ViewMap[type];
    if (view)
      return this.ViewMap[type];
    else
      return this.ViewMap['TextState']; // default
  }
}
