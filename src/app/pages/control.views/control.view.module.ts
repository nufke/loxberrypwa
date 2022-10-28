import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ControlView } from './control.view';
import { ControlViewRoutingModule } from './control.view-routing.module';
import { ControlViewBase } from './control.view.base';
import { ControlTextView } from './control.text.view/control.text.view'
import { ControlLightView } from './control.light.view/control.light.view';
import { ControlRadioView } from './control.radio.view/control.radio.view';
import { ControlSwitchView } from './control.switch.view/control.switch.view';
import { ControlSliderView } from './control.slider.view/control.slider.view';
import { ControlPushView } from './control.push.view/control.push.view';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: ControlView }]),
    ControlViewRoutingModule,
  ],
  declarations: [
    ControlViewBase,
    ControlView,
    ControlTextView,
    ControlLightView,
    ControlRadioView,
    ControlSwitchView,
    ControlSliderView,
    ControlPushView
  ],
  providers: [
  ],
  entryComponents: [
    ControlTextView,
    ControlLightView,
    ControlRadioView,
    ControlSwitchView,
    ControlSliderView,
    ControlPushView
  ]
})
export class ControlViewModule {}
