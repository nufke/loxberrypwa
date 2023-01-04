import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Control, Subcontrol } from '../../interfaces/data.model';
import { ControlService } from '../../services/control.service';
import { View } from '../../types/types';
import { ControlTextStateView } from '../../views/control-text-state/control-text-state.view';
import { ControlLightV2View } from '../../views/control-light-v2/control-light-v2.view';
import { ControlRadioView } from '../../views/control-radio/control-radio.view';
import { ControlSwitchView } from '../../views/control-switch/control-switch.view';
import { ControlSliderView } from '../../views/control-slider/control-slider.view';
import { ControlPushbuttonView } from '../../views/control-pushbutton/control-pushbutton.view';
import { ControlColorPickerV2View } from '../../views/control-color-picker-v2/control-color-picker-v2.view';
import { ControlIRCView } from '../../views/control-irc/control-irc.view';

@Component({
  selector: 'app-detailed-control',
  templateUrl: 'detailed-control.page.html',
  styleUrls: ['./detailed-control.page.scss']
})
export class DetailedControlPage
  implements OnInit {

  @ViewChild('viewcontainer', { read: ViewContainerRef, static: true })

  viewContainer: ViewContainerRef;
  componentRef;

  viewType = View;

  control: Control;
  subcontrol: Subcontrol;

  page_name: string;

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
    'info_only_analog': ControlTextStateView,
    'info_only_digital': ControlTextStateView,
    'info_only_text': ControlTextStateView,
    'text_state': ControlTextStateView,
    'light_controller_v2': ControlLightV2View,
    'radio': ControlRadioView,
    'switch': ControlSwitchView,
    'slider': ControlSliderView,
    'pushbutton': ControlPushbuttonView,
    'color_picker_v2': ControlColorPickerV2View,
    'i_room_controller': ControlIRCView
  }

  constructor(
    public translate: TranslateService,
    private route: ActivatedRoute,
    private controlService: ControlService ) {

    this.initVM();
  }

  private initVM() : void {
    const control_hwid = this.route.snapshot.paramMap.get('control_hwid');
    const control_uuid = this.route.snapshot.paramMap.get('control_uuid');
    const subcontrol_uuid = this.route.snapshot.paramMap.get('subcontrol_uuid');
    const subcontrol_uuid_ext = this.route.snapshot.paramMap.get('subcontrol_uuid_ext');

    this.controlService.getControl(control_hwid, control_uuid).subscribe(
      control => {
        this.control = control;
        this.page_name = (control.type === 'i_room_controller') ?
        this.translate.instant(this.irc_mode.find(item => item.id == control.states.mode ).name) : control.name;
      }
    );
    if (subcontrol_uuid != null) {
      this.controlService.getSubcontrol(control_hwid, control_uuid, subcontrol_uuid + '/' + subcontrol_uuid_ext).subscribe(
        subcontrol => {
          this.subcontrol = subcontrol;
          this.page_name = subcontrol.name;
        }
      );
    }
  }

  ngOnInit() : void {
    this.loadControlComponent(this.control, this.subcontrol);
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
      return this.ViewMap['text_state']; // default
  }

  public ngOnDestroy() : void {
    this.viewContainer.clear(); // remove dynamic view from memory
    this.componentRef = -1;

    // TODO unsubscribe
  }

}
