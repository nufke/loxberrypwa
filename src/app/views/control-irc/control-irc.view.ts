import { Component, ViewChild, Input, OnInit, OnDestroy } from '@angular/core';
import { IonSelect } from '@ionic/angular';
import { Observable, combineLatest } from 'rxjs';
import { map } from "rxjs/operators";
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';
import { Control, Room, Category } from '../../interfaces/data.model';
import { TranslateService } from '@ngx-translate/core';
import { ControlService } from '../../services/control.service';
import { IRCVM } from '../../interfaces/view.model';
import { View } from '../../types/types';

SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom]);

var sprintf = require('sprintf-js').sprintf;

@Component({
  selector: 'control-irc-view',
  templateUrl: 'control-irc.view.html',
  styleUrls: ['./control-irc.view.scss'],
})
export class ControlIRCView
  implements OnInit, OnDestroy {
    @ViewChild('modes') selectModesRef: IonSelect;
    @ViewChild('presets') selectPresetsRef: IonSelect;

  @Input() control: Control;
  @Input() view: View;

  viewType = View;
  vm$: Observable<IRCVM>;

  ircModes = [
    { id: 0, name: 'Automatic' },
    { id: 1, name: 'Automatic (currently heating)' },
    { id: 2, name: 'Automatic (currently cooling)' },
    { id: 3, name: 'Automatic heating' },
    { id: 4, name: 'Automatic cooling' },
    { id: 5, name: 'Manual heating' },
    { id: 6, name: 'Manual cooling' }
  ];

  private radioListHeating = [
    { id: 0, name: 'Economy' },
    { id: 1, name: 'Comfort heating' },
    { id: 3, name: 'Empty house' },
    { id: 4, name: 'Heat protection' },
    { id: 5, name: 'Increased heat' },
    { id: 6, name: 'Party' }
  ];

  private radioListCooling = [
    { id: 0, name: 'Economy' },
    { id: 2, name: 'Comfort cooling' },
    { id: 3, name: 'Empty house' },
    { id: 4, name: 'Heat protection' },
    { id: 5, name: 'Increased heat' },
    { id: 6, name: 'Party' }
  ];

  selectOptionsPreset = {
    header: 'Select temperature preset',
    cssClass: 'actionsheet',
  };

  selectOptionsModes = {
    header: 'Select operating mode',
    cssClass: 'actionsheet',
  };

  constructor(
    public translate: TranslateService,
    public controlService: ControlService) {
  }

  ngOnInit(): void {
    this.initVM();
  }

  ngOnDestroy(): void {
  }

  private initVM(): void {
    if (this.control == undefined) {
      console.error('Control component not available for rendering.');
      return;
    }

    this.vm$ = combineLatest([
      this.controlService.getControl$(this.control.hwid, this.control.uuid),
      this.controlService.categories$,
      this.controlService.rooms$,
    ]).pipe(
      map(([control, categories, rooms]) => {
        return this.updateVM(control, categories, rooms);
      })
    );
  }

  private updateVM(control: Control, categories: Category[], rooms: Room[]): IRCVM {
    let room: Room = rooms.find(room => room.uuid === control.room && room.hwid === control.hwid);
    let category: Category = categories.find(category => category.uuid === control.category && category.hwid === control.hwid);

    let temp = ['',''];

    if (control.states.temp_actual) {
      temp = sprintf("%.1f", control.states.temp_actual).split('.');
      temp[1] = '.' + temp[1];
    }

    let idx = this.ircModes.findIndex(item => { return item.id == control.states.mode });

    let subcontrols = Object.keys(control.subcontrols);
    let state = control.subcontrols[subcontrols[0]].states.value; // TODO read states from both subcontrols?

    let mode = control.states.mode;
    let heating = ((mode == 1) || (mode == 3) || (mode == 5));

    let preset_list = heating ? this.radioListHeating : this.radioListCooling;
    let idxx = preset_list.findIndex( item => { return item.id == state } );

    const vm: IRCVM = {
      control: control,
      ui: {
        name: this.ircModes[idx].name,
        room: (room && room.name) ? room.name : "unknown",
        category: (category && category.name) ? category.name : "unknown",
        temp_target: Number(control.states.temp_target),
        temp_actual: Number(control.states.temp_actual),
        mode_list: this.ircModes,
        mode: idx,
        preset_list: preset_list,
        preset: idxx,
        icon: {
          temp_base: temp[0],
          temp_dec: temp[1]
        },
        status: {
          text: preset_list[idxx].name, // translate in scss to enable radio selection highlighting
          color: (idxx > 0) ? "#69c350" : "#9d9e9e" // TODO select from color palette
        }
      }
    };
    return vm;
  }

  openSelectPresets() {
    setTimeout(()=>{
      this.selectPresetsRef.open();
    }, 2);
  }

  openSelectModes() {
    setTimeout(()=>{
      this.selectModesRef.open();
    }, 2);
  }

  setMode(vm, event) {
    console.log('Selected operating mode is', event.detail.value);
  }

  setPreset(vm, event) {
    console.log('Selected preset is', event.detail.value);
  }

}
