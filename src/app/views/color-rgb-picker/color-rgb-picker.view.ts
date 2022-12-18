import { Component, OnInit } from '@angular/core';
import iro from "@jaames/iro";
import { ViewBase } from '../view.base';
import { LoxBerryService } from '../../services/loxberry.service';
import { ControlService } from '../../services/control.service';

@Component({
  selector: 'app-color-rgb-picker-view',
  templateUrl: 'color-rgb-picker.view.html',
  styleUrls: ['./color-rgb-picker.view.scss'],
})
export class ColorRGBPickerView
  extends ViewBase
  implements OnInit {

  constructor(
    public loxBerryService: LoxBerryService,
    public controlService: ControlService) {
    super(controlService);
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
    this.loxBerryService.sendMessage(this.control, this.control.states.color);
  }

}
