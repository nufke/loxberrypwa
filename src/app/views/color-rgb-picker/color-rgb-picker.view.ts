import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TextView } from '../text/text.view';
import { LoxBerry } from '../../providers/loxberry';
import { Control, Subcontrol, Category, Room } from '../../interfaces/datamodel'
import iro from "@jaames/iro";

@Component({
  selector: 'app-color-rgb-picker-view',
  templateUrl: 'color-rgb-picker.view.html',
  styleUrls: ['./color-rgb-picker.view.scss'],
})
export class ColorRGBPickerView
  extends TextView
  implements OnInit {

  constructor(public LoxBerryService: LoxBerry) {
    super();
  }

  ngOnInit() {
    let ref = this;
    var ColorPicker = iro.ColorPicker(".picker",
    {
      width: 280,
      color: this.control.display.rgb,
      borderWidth: 8,
      borderColor: "#232425", // same as card
      handleRadius: 10,
      layout: [ { component: iro.ui.Wheel, } ]
    });

    ColorPicker.on('color:change', (color) => { this.updateColor(color) });
  }

  updateColor(color) {
    let v = this.control.display.value;
    this.control.states.color = 'hsv(' + Math.round(color.hsv.h) + ',' + Math.round(color.hsv.s) + ',' + v + ')';
    this.LoxBerryService.sendMessage(this.control, this.control.states.color);
  }

}
