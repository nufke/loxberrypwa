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
    ControlLightPage
  ],
  providers: [
  ],
  entryComponents: [
    ControlTextPage,
    ControlLightPage
  ]
})
export class ControlPageModule {}
