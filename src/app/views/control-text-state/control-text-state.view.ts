import { Component, Input, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from "rxjs/operators";
import { Control, Room, Category, View } from '../../interfaces/datamodel';
import { TranslateService } from '@ngx-translate/core';
import { ControlService } from '../../services/control.service';
import * as moment from 'moment';

var sprintf = require('sprintf-js').sprintf;

interface VM {
  control: Control;
  ui: {
    name: string;
    room: string;
    category: string;
    status: {
      text: string;
      color: string;
    }
  }
}

@Component({
  selector: 'control-text-state-view',
  templateUrl: 'control-text-state.view.html',
  styleUrls: ['./control-text-state.view.scss'],
})
export class ControlTextStateView
  implements OnInit {

  @Input() control: Control;
  @Input() view: View;

  viewType = View;
  vm$: Observable<VM>;

  constructor(
    public translate: TranslateService,
    public controlService: ControlService) {
  }

  ngOnInit() {
    this.initVM();
  }

  private initVM(): void {
    if (this.control == undefined) {
      console.error('Component \'control-text-state\' not available for rendering.');
      return;
    }

    this.vm$ = combineLatest([
      this.controlService.getControl(this.control.hwid, this.control.uuid),
      this.controlService.categories$,
      this.controlService.rooms$,
    ]).pipe(
      map(([control, categories, rooms]) => {
        let room: Room = rooms.find(room => room.uuid === control.room && room.hwid === control.hwid);
        let category: Category = categories.find(category => category.uuid === control.category && category.hwid === control.hwid);

        const vm: VM = {
          control: control,
          ui: {
            name: control.name,
            room: (room && room.name) ? room.name : "unknown",
            category: (category && category.name) ? category.name : "unknown",
            status: {
              text: this.processText(control),
              color: this.processColor(control),
            }
          }
        };
        return vm;
      })
    );
  }

  processText(control): string {
    let text: string;
    switch (control.type) {
      case 'info_only_text':
        text = sprintf(control.details.format, control.states.text);
        break;
      case 'info_only_digital':
        let active = (control.states.active === "1");
        text = active ? control.details.text.on : control.details.text.off;
        break;
      case 'text_state':
        text = control.states.text_and_icon;
        break;
      case 'info_only_analog':
        switch (control.details.format) {
          case '<v.u>': // date + time
            let date = new Date(Number(control.states.value) * 1000 + 1230768000000);
            text = moment(date).format("DD-MM-YYYY hh:mm").toString();
            break;
          case '<v.t>': // duration/time
            let du = Number(control.states.value) / 60;
            let days = Math.floor(du / 1440);
            let hours = Math.floor((du % 1440) / 60);
            let minutes = Math.floor((du % 1440) % 60);
            text = days + 'd ' + hours + 'h ' + minutes + 'm'; //
            break;
          case '<v.d>': // EIS4, dd:mm:yyyy
            let d = new Date(Number(control.states.value) * 1000 + 1230768000000); // TODO check
            text = moment(d).format("DD:MM:YYYY").toString();
            break;
          case '<v.x>': // digital value
            text = control.states.value ? '1' : '0'; // TODO check
            break;
          case '<v.j>': // combined value
            control.details.format = '%f'; // TODO: check
          case '<v.i>': // combined pushbutton
            control.details.format = '%f'; // TODO: check
          case '<v.c>': // color
            control.details.format = '#%6h'; // TODO: check
          case '<v.m>': // EIS3, hh:mm:ss
            control.details.format = '%d'; // TODO: check
          case '<v>': // integer
            control.details.format = '%d';
          case '<v.1>': // float in x.y notation
            control.details.format = '%.1f';
          case '<v.2>': // float in x.yy notation
            control.details.format = '%.2f';
          case '<v.3>': // float in x.yy notation
            control.details.format = '%.3f';
          default:
            text = sprintf(control.details.format, control.states.value);
            break;
        }
        break;
      default:
        text = ''; // Empty
    }
    return text;
  }

  processColor(control): string {
    let color: string;
    switch (control.type) {
      case 'info_only_digital':
        let active = (control.states.active === "1");
        color = active ? control.details.color.on : control.details.color.off;
        break;
      default:
        color = "#9d9e9e"; // TODO select from color palette
    }
    return color;
  }

}
