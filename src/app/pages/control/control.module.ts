import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ControlPage } from './control.page';
import { ControlPageRoutingModule } from './control-routing.module';
import { ControlBase } from './control.base';
import { ControlTextPage } from './control.text/control.text.page'
import { ControlLightPage } from './control.light/control.light.page';
import { ControlRadioPage } from './control.radio/control.radio.page';
import { ControlSwitchPage } from './control.switch/control.switch.page';
import { ControlSliderPage } from './control.slider/control.slider.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: ControlPage }]),
    ControlPageRoutingModule,
  ],
  declarations: [
    ControlBase,
    ControlPage,
    ControlTextPage,
    ControlLightPage,
    ControlRadioPage,
    ControlSwitchPage,
    ControlSliderPage
  ],
  providers: [
  ],
  entryComponents: [
    ControlTextPage,
    ControlLightPage,
    ControlRadioPage,
    ControlSwitchPage,
    ControlSliderPage
  ]
})
export class ControlPageModule {}
