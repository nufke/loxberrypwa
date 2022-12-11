import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FavoritesPage } from './favorites.page';
import { FavoritesPageRoutingModule } from './favorites-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    FavoritesPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [
    FavoritesPage
  ],
  providers: [
  ],
})
export class FavoritesPageModule {}
