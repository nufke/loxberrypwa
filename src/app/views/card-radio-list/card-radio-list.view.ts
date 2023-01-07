import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ControlService } from '../../services/control.service';
import { RadioVM } from '../../interfaces/view.model';

@Component({
  selector: 'card-radio-list-view',
  templateUrl: 'card-radio-list.view.html',
  styleUrls: ['./card-radio-list.view.scss'],
})
export class CardRadioListView
  implements OnInit {

  @Input() radio_vm: RadioVM;

  constructor(
    public translate: TranslateService,
    public controlService: ControlService) {
  }

  ngOnInit() {
  }

  radioGroupChange(vm: RadioVM, $event) {

    if (vm.control.type === 'Radio') {
      let idx = vm.ui.radio_list.findIndex( item => item.name === $event.detail.value);
      let msg = String(vm.ui.radio_list[idx].id);
      if (msg === "0") msg = "reset"; // loxone requires reset instead of ID
      this.controlService.updateControl(vm.control, msg);
    }

    if (vm.control.type === 'LightControllerV2') {
      let idx = vm.ui.radio_list.findIndex( item => item.name === $event.detail.value);
      let msg = 'changeTo/' + String(vm.ui.radio_list[idx].id);
      this.controlService.updateControl(vm.control, msg);
    }

    if (vm.control.type === 'IRoomController') {
      //TODO
    }
  }

}
