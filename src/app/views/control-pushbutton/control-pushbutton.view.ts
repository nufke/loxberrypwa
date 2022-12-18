import { Component } from '@angular/core';
import { ViewBase } from '../view.base';
import { TranslateService } from '@ngx-translate/core';
import { LoxBerryService } from '../../services/loxberry.service';

@Component({
  selector: 'control-pushbutton-view',
  templateUrl: 'control-pushbutton.view.html',
  styleUrls: ['./control-pushbutton.view.scss'],
})
export class ControlPushbuttonView
  extends ViewBase {

  constructor(
    public translate: TranslateService,
    public loxBerryService: LoxBerryService) {
    super(translate, loxBerryService);
  }

}
