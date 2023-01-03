import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LoxBerryService } from '../../services/loxberry.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    private navCtrl: NavController,
    public loxBerryService: LoxBerryService ) // TODO who should contruct LoxBerryService?
  {}

  click(tab: string) {
    // TODO check other mechanism to navigate to tab root page
    this.navCtrl.navigateRoot(tab);
  }

}
