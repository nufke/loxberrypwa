import { Component, OnInit, Input } from '@angular/core';
import iro from "@jaames/iro";
import { TranslateService } from '@ngx-translate/core';
import { ControlService } from '../../services/control.service';
import { Control, ColorPickerVM } from '../../interfaces/datamodel';

@Component({
  selector: 'element-color-temp-picker-view',
  templateUrl: 'element-color-temp-picker.view.html',
  styleUrls: ['./element-color-temp-picker.view.scss'],
})
export class ElementColorTempPickerView
  implements OnInit {

  @Input() vm: ColorPickerVM;

  TempPicker;

  constructor(
    public translate: TranslateService,
    public controlService: ControlService) {
  }

  ngOnChanges() {
    if (this.TempPicker)
      this.TempPicker.color.set(this.vm.rgb);
  }

  ngOnInit() {
    this.TempPicker = iro.ColorPicker(".picker",
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
    this.TempPicker.on('color:change', (color) => { this.updateColor(color) });
  }

  updateColor(color) {
    let hsv_color = 'hsv(' + Math.round(color.hsv.h) + ',' + Math.round(color.hsv.s) + ',' + this.vm.position + ')';
    this.controlService.updateControl(this.vm.subcontrol, hsv_color);
  }

}
