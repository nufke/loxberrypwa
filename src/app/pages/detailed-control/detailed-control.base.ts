import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Control, Category, Room } from '../../interfaces/datamodel'
import { LoxBerry } from '../../providers/loxberry';
import * as moment from 'moment';

var sprintf = require('sprintf-js').sprintf

@Component({
  selector: 'detailed-control.base',
  template: '',
})
export class DetailedControlBase {

  public btnAction = {
    Up: true,
    Down: false,
    Left: 'left',
    Right: 'right',
    Plus: true,
    Minus: false,
    Push: 'pulse',
    Toggle: 'toggle',
    Slider: 'slider'
  };

  public radio_list: string[];
  public LoxBerryService: LoxBerry;

  constructor() {}

  public updateDisplay(control: any) {

    control.display.color = "#9d9e9e"; // TODO select from color palette
    control.icon.color = "#9d9e9e"; // TODO select from color palette
    switch(control.type) {
      case 'info_only_digital':
        if (control.states.active === "1") {
          control.display.text = control.details.text.on;
          control.display.color = control.details.color.on;
        }
        else {
          control.display.text = control.details.text.off;
          control.display.color = control.details.color.off;
        }
        break;
      case 'info_only_text':
        control.display.text = sprintf(control.details.format, control.states.text);
        break;
      case 'info_only_analog':
        switch(control.details.format) {
        case '<v.u>': // date + time
          let date = new Date(Number(control.states.value)*1000 + 1230768000000);
          control.display.text = moment(date).format("DD-MM-YYYY hh:mm").toString();
          break;
        case '<v.t>': // duration
          let duration = moment.duration(Number(control.states.value), 'seconds');
          control.display.text = duration.days() + 'd ' + (duration.subtract(duration.days())).hours() + 'h';
          break;
        case '<v.d>': // EIS4, dd:mm:yyyy
          let d = new Date(Number(control.states.value)*1000 + 1230768000000); // TODO check
          control.display.text = moment(d).format("DD:MM:YYYY").toString();
          break;
        case '<v.x>': // digital value
          control.display.text = control.states.value ? '1' : '0'; // TODO check
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
          control.display.text = sprintf(control.details.format, control.states.value);
          break;
        }
        break;
      case 'text_state':
        control.display.text = control.states.text_and_icon;
        break;
      case 'slider':
        control.display.text = sprintf(control.details.format, control.states.value);
        break;
      case 'dimmer':
        control.display.value = Number(control.states.position);
        control.display.color = '-webkit-linear-gradient(left, rgba(49,56,62, 1), rgb(255, 229, 127))'
        break;
      case 'color_picker_v2':
        let res = control.states.color.match(/hsv\(([0-9]*),([0-9]*),([0-9]*)\)/);
        if (res) {
          control.display.value = Number(res[3]);
          let rgb = this.hsv2rgb(res[1], res[2], 100);
          control.display.color = '-webkit-linear-gradient(left, rgba(49,56,62, 1), rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + '))';
        }
        break;
      case 'switch':
        if (control.states.active === "1") {
          control.display.text = "On";
          control.display.toggle = true;
          control.display.color = "#69c350"; // primary
          control.icon.color = "primary";
        }
        else {
          control.display.text = "Off";
          control.display.toggle = false;
          control.icon.color = "#9d9e9e"; // TODO select from color palette
        }
        break;
      case 'radio':
        let val = Number(control.states.active_output);
        this.radio_list = [control.details.all_off].concat(Object.values(control.details.outputs));
        if (!val) val = 0;
        if (val > 0) control.display.color = "#69c350"; // primary
        if (this.radio_list) control.display.text = this.radio_list[val];
        break;
      case 'light_controller_v2':
        if (control.states.mood_list)
        {
          let id = control.states.active_moods[0];
          let mood_list = control.states.mood_list;
          if (id) {
            let mood_idx = mood_list.findIndex( item => { return item.id == id } );
            control.display.text = mood_list[mood_idx].name;
          }
          else
            control.display.text = 'Manual'; // TODO translate
          if (id != 778) {
            control.display.color = "#69c350"; // primary
            control.icon.color = "primary";
          }
        }
        break;
      case 'i_room_controller':
        control.display.text = sprintf("%.1f", control.states.temp_actual);
      default:
        // no status change
    }
    if (control.subcontrols && Object.keys(control.subcontrols).length > 0)
      Object.values(control.subcontrols).forEach( subcontrol => this.updateDisplay(subcontrol))
  }

  public btn(btnAction, $event, control) {
    $event.preventDefault();
    $event.stopPropagation();

    switch(control.type) {
      case 'radio':
        this.ctrl_radio(control, btnAction);
        break;
      case 'switch':
        this.ctrl_toggle(control);
        break;
      case 'push':
        this.ctrl_push(control, btnAction);
        break;
      case 'slider':
        this.ctrl_slider_updown(control, btnAction);
        break;
      case 'light_controller_v2':
        this.ctrl_light_v2(control);
        break;
      default:
        console.log('btn: no implementation for ', btnAction );

    }
  }

  public ctrl_light_v2(control) {
    let id = control.states.active_moods[0];
    let mood_idx;
    let mood_list = control.states.mood_list;
    let max = Object.keys(mood_list).length-1;
    if (id) {
      mood_idx = mood_list.findIndex( item => { return item.id == id } );
      mood_idx++;
      if (mood_idx > max) mood_idx = 0;
    }
    else {
      mood_idx = 0;
    }
      this.LoxBerryService.sendMessage(control, 'changeTo/' + String(mood_list[mood_idx].id));
  }

  public ctrl_radio(control, is_up) {
    if (control.details.outputs) // process only if there are radio list names
    {
      let list: string[] = [control.details.all_off].concat(Object.values(control.details.outputs));
      let val = Number(control.states.active_output);
      let max = list.length-1;
      let min = 0;

      if (is_up) val++;
        else val--;

      if (val > max)
        val = min;
      else
        if (val < min)
          val = max;

      control.states.active_output = val;

      let msg = String(val);
      if (msg === "0") msg = "reset"; // loxone requires reset instead of ID

      this.LoxBerryService.sendMessage(control, msg);
    }
  }

  public ctrl_slider_updown(control, is_up) {
    let val = Number(control.states.value);
    if (!val) val = 0;
    let step = Number(control.details.step);
    let min = Number(control.details.min);
    let max = Number(control.details.max);

    if (!min) min = 0;
    if (!max) max = 100;
    if (!step) step = 1;

    let new_val;
    if (is_up) new_val = val + step;
    else new_val = val - step;

    if (new_val < min) new_val = min;
    if (new_val > max) new_val = max;

    control.states.value = String(new_val);
    this.LoxBerryService.sendMessage(control, control.states.value);
  }

  public ctrl_toggle(control) {
    let str;

    if (control.display.toggle) { // on -> off
      str = "Off";                       // TODO move to enum
    }
    else { // off -> on
      str = "On";
    }
    this.LoxBerryService.sendMessage(control, str);
  }

  public ctrl_push(control, action) {
    control.states.active = action;
    this.LoxBerryService.sendMessage(control, control.states.active);
  }

  // TODO, take from iro.js
  public hsv2rgb(h_, s_, v_) {
    const clampround = (num, a, b) => Math.round(Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b)));
    const h = h_ / 60;
    const s = s_ / 100;
    const v = v_ / 100;
    const i = Math.floor(h);
    const f = h - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    const mod = i % 6;
    const r = [v, q, p, p, t, v][mod];
    const g = [t, v, v, q, p, p][mod];
    const b = [p, p, t, v, v, q][mod];
    return [
      clampround(r * 255, 0, 255),
      clampround(g * 255, 0, 255),
      clampround(b * 255, 0, 255)
    ];
  }

}
