import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ControlTextStateView } from './control-text-state/control-text-state.view';
import { ControlSwitchView } from './control-switch/control-switch.view';
import { ControlSliderView } from './control-slider/control-slider.view';
import { ControlPushbuttonView } from './control-pushbutton/control-pushbutton.view';
import { ControlLightV2View } from './control-light-v2/control-light-v2.view';
import { ControlRadioView } from './control-radio/control-radio.view';
import { TextView } from './text/text.view';
import { SwitchView } from './switch/switch.view';
import { SliderView } from './slider/slider.view';
import { PushButtonView } from './pushbutton/pushbutton.view';
import { LightV2View } from './light-v2/light-v2.view';
import { RadioView } from './radio/radio.view';
import { RadioSwitchView } from './radio-switch/radio-switch.view';
import { DimmerView } from './dimmer/dimmer.view';
import { ControlColorPickerV2View } from './control-color-picker-v2/control-color-picker-v2.view';
import { ColorRGBPickerView } from './color-rgb-picker/color-rgb-picker.view';
import { ColorTempPickerView } from './color-temp-picker/color-temp-picker.view';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule,
    TranslateModule //.forChild()
  ],
  declarations: [
    ControlTextStateView,
    ControlSwitchView,
    ControlSliderView,
    ControlPushbuttonView,
    ControlLightV2View,
    ControlRadioView,
    ControlColorPickerV2View,
    TextView,
    SwitchView,
    SliderView,
    PushButtonView,
    LightV2View,
    RadioView,
    RadioSwitchView,
    DimmerView,
    ColorRGBPickerView,
    ColorTempPickerView
  ],
  exports: [
    IonicModule,
    RouterModule,
    ControlTextStateView,
    ControlSwitchView,
    ControlSliderView,
    ControlPushbuttonView,
    ControlLightV2View,
    ControlRadioView,
    ControlColorPickerV2View,
    TextView,
    SwitchView,
    SliderView,
    PushButtonView,
    LightV2View,
    RadioView,
    RadioSwitchView,
    DimmerView,
    ColorRGBPickerView,
    ColorTempPickerView
  ]
})
export class ViewsModule { }
