import { Component, Input, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from "rxjs/operators";
import { Control, Room, Category } from '../../interfaces/data.model';
import { TranslateService } from '@ngx-translate/core';
import { ControlService } from '../../services/control.service';
import { RadioVM } from '../../interfaces/view.model';
import { View } from '../../types/types';

var sprintf = require('sprintf-js').sprintf;

@Component({
  selector: 'control-irc-view',
  templateUrl: 'control-irc.view.html',
  styleUrls: ['./control-irc.view.scss'],
})
export class ControlIRCView
  implements OnInit {

  @Input() control: Control;
  @Input() view: View;

  viewType = View;
  vm$: Observable<RadioVM>;
  segment: string = 'modes';

  private irc_mode = [
    { id: 0, name: 'Automatic' },
    { id: 1, name: 'Automatic (currently heating)' },
    { id: 2, name: 'Automatic (currently cooling)' },
    { id: 3, name: 'Automatic heating' },
    { id: 4, name: 'Automatic cooling' },
    { id: 5, name: 'Manual heating' },
    { id: 6, name: 'Manual cooling' }
  ];

  private radio_list_heating = [
    { id: 0, name: 'Economy' },
    { id: 1, name: 'Comfort Heating' },
    { id: 3, name: 'Empty House' },
    { id: 4, name: 'Heat Protection' },
    { id: 5, name: 'Increased Heat' },
    { id: 6, name: 'Party' }
  ];

  private radio_list_cooling = [
    { id: 0, name: 'Economy' },
    { id: 2, name: 'Comfort Cooling' },
    { id: 3, name: 'Empty House' },
    { id: 4, name: 'Heat Protection' },
    { id: 5, name: 'Increased Heat' },
    { id: 6, name: 'Party' }
  ];

  constructor(
    public translate: TranslateService,
    public controlService: ControlService) {
  }

  ngOnInit() {
    this.initVM();
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

  private updateVM(control: Control, categories: Category[], rooms: Room[]): RadioVM {
    let room: Room = rooms.find(room => room.uuid === control.room && room.hwid === control.hwid);
    let category: Category = categories.find(category => category.uuid === control.category && category.hwid === control.hwid);

    let temp = sprintf("%.1f", control.states.temp_actual).split('.');
    let idx = this.irc_mode.findIndex(item => { return item.id == control.states.mode });

    let subcontrols = Object.keys(control.subcontrols);
    let state = control.subcontrols[subcontrols[0]].states.value; // TODO read states from both subcontrols?

    let heat_or_cool = 1; // TODO default: heating?
    let mode = control.states.mode;
    let heating = ((mode == 1) || (mode == 3) || (mode == 5));

    let radio_list = heating ? this.radio_list_heating : this.radio_list_cooling;
    let idxx = radio_list.findIndex( item => { return item.id == state } );

    const vm: RadioVM = {
      control: control,
      ui: {
        name: this.translate.instant(this.irc_mode[idx].name),
        room: (room && room.name) ? room.name : "unknown",
        category: (category && category.name) ? category.name : "unknown",
        radio_list: radio_list,
        selected_id: state,
        icon: {
          temp_base: temp[0],
          temp_dec: '.' + temp[1]
        },
        status: {
          text: radio_list[idxx].name, // translate in scss to enable radio selection highlighting
          color: (idxx > 0) ? "#69c350" : "#9d9e9e" // TODO select from color palette
        }
      }
    };
    return vm;
  }

  updateSegment() {
    // Close any open sliding items when the schedule updates
  }

}
