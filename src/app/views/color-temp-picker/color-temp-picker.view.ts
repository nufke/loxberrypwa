import { Component, OnInit } from '@angular/core';
import iro from "@jaames/iro";
import { ViewBase } from '../view.base';
import { LoxBerryService } from '../../services/loxberry.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-color-temp-picker-view',
  templateUrl: 'color-temp-picker.view.html',
  styleUrls: ['./color-temp-picker.view.scss'],
})
export class ColorTempPickerView
  extends ViewBase
  implements OnInit {

  constructor(
    public translate: TranslateService,
    public loxBerryService: LoxBerryService) {
    super(translate, loxBerryService);
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
    this.loxBerryService.sendMessage(this.control, this.control.states.color);
  }

}
