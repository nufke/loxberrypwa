import { Component } from '@angular/core';
import { ViewBase } from '../view.base';
import { LoxBerryService } from '../../services/loxberry.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-pushbutton-view',
  templateUrl: 'pushbutton.view.html',
  styleUrls: ['./pushbutton.view.scss'],
})
export class PushButtonView
  extends ViewBase {

  constructor(
    public translate: TranslateService,
    public loxBerryService: LoxBerryService) {
    super(translate, loxBerryService);
  }

  pushed() {
    this.loxBerryService.sendMessage(this.control, 'pulse');
  }

}
