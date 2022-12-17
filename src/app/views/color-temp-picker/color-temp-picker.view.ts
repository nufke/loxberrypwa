import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TextView } from '../text/text.view';
import { LoxBerry } from '../../providers/loxberry';
import { Control, Subcontrol, Category, Room } from '../../interfaces/datamodel'
import iro from "@jaames/iro";

@Component({
  selector: 'app-color-temp-picker-view',
  templateUrl: 'color-temp-picker.view.html',
  styleUrls: ['./color-temp-picker.view.scss'],
})
export class ColorTempPickerView
  extends TextView
  implements OnInit {

  constructor(
    public LoxBerryService: LoxBerry,
    public translate: TranslateService) {
    super(translate);
  }

  ngOnInit() {
    let ref = this;
    var TempPicker = iro.ColorPicker(".picker",
    {
      width: 280,
      borderWidth: 8,
      borderColor: "#232425", // same as card
      handleRadius: 10,
      layoutDirection: 'horizontal',
      layout: [ {
        component: iro.ui.Slider,
        options: {
          sliderShape: 'circle',
          sliderType: 'kelvin',
        }
      } ]
    });

    TempPicker.on('color:change', (color) => { this.updateColor(color) });
  }

  updateColor(color) {
    let v = this.control.display.value;
    this.control.states.color = 'hsv(' + Math.round(color.hsv.h) + ',' + Math.round(color.hsv.s) + ',' + v + ')';
    this.LoxBerryService.sendMessage(this.control, this.control.states.color);
  }

}
