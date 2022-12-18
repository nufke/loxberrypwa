import { Component, Input } from '@angular/core';
import { ButtonAction } from '../interfaces/datamodel';
import { ControlsBase } from '../pages/controls/controls.base';
import { TranslateService } from '@ngx-translate/core';
import { LoxBerryService } from '../services/loxberry.service';

@Component({
  selector: 'view.base',
  template: '',
})
export class ViewBase
  extends ControlsBase {

  @Input() control: any;
  @Input() category: any;
  @Input() room: any;

  @Input() name: string;

  public btnAction = ButtonAction;

  constructor(
    public translate: TranslateService,
    public loxBerryService: LoxBerryService) {
    super(translate, loxBerryService);
  }

}
