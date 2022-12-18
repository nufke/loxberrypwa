import { Component, Input, OnInit } from '@angular/core';
import { ViewBase } from '../view.base';
import { TranslateService } from '@ngx-translate/core';
import { LoxBerryService } from '../../services/loxberry.service';

@Component({
  selector: 'app-switch-view',
  templateUrl: 'switch.view.html',
  styleUrls: ['./switch.view.scss'],
})
export class SwitchView
  extends ViewBase
  implements OnInit {

  constructor(public translate: TranslateService,
    public loxBerryService: LoxBerryService) {
    super(translate, loxBerryService);
  }

  ngOnInit() {
    if (this.control.states.active === "1")
      this.control.display.toggle = true;
    else
      this.control.display.toggle = false;
  }

}
