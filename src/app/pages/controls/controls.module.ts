import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ControlsPage } from './controls.page';
import { ControlsPageRoutingModule } from './controls-routing.module';

@NgModule({
  imports: [
    IonicModule.forRoot({
      rippleEffect: false,
      animated: false
    }),
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: ControlsPage }]),
    ControlsPageRoutingModule,
    TranslateModule
  ],
  declarations: [
    ControlsPage
  ],
  providers: [
  ]
})
export class ControlsPageModule {}
