import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ControlService } from '../../services/control.service';

@Component({
  selector: 'card-text-view',
  templateUrl: 'card-text.view.html',
  styleUrls: ['./card-text.view.scss'],
})
export class CardTextView {

  @Input() vm: any; // TODO define explicit interface

  constructor(
    public translate: TranslateService,
    public controlService: ControlService) {
  }

}
