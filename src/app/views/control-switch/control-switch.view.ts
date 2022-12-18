import { Component } from '@angular/core';
import { ViewBase } from '../view.base';
import { TranslateService } from '@ngx-translate/core';
import { LoxBerryService } from '../../services/loxberry.service';

@Component({
  selector: 'control-switch-view',
  templateUrl: 'control-switch.view.html',
  styleUrls: ['./control-switch.view.scss'],
})
export class ControlSwitchView
  extends ViewBase {

  constructor(
    public translate: TranslateService,
    public loxBerryService: LoxBerryService) {
    super(translate, loxBerryService);
  }

  ngOnInit() {
  }

}
