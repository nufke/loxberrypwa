import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { ViewsModule } from '../../views/views.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HomePageRoutingModule,
    TranslateModule.forChild(),
    ViewsModule
  ],
  declarations: [
    HomePage
  ],
  providers: [

  ],
})
export class HomePageModule {}
