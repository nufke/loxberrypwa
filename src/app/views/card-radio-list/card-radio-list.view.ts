import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ControlService } from '../../services/control.service';
import { Control, Subcontrol } from '../../interfaces/datamodel';

interface RadioListItem {
  id: number;
  name: string;
}

interface RadioVM {
  control: Control;
  ui: {
    name: string;
    room: string;
    category: string;
    radio_list: RadioListItem[];
    selected_id: number;
    icon?: {
      temp_base: string;
      temp_dec: string
    }
    status: {
      text: string;
      color: string;
    }
  }
  subcontrols?: Subcontrol[];
}


@Component({
  selector: 'card-radio-list-view',
  templateUrl: 'card-radio-list.view.html',
  styleUrls: ['./card-radio-list.view.scss'],
})
export class CardRadioListView
  implements OnInit {

  @Input() vm: RadioVM;

  constructor(
    public translate: TranslateService,
    public controlService: ControlService) {
  }

  ngOnInit() {
  }

  radioGroupChange(vm: RadioVM, $event) {

    if (vm.control.type === 'radio') {
      let idx = vm.ui.radio_list.findIndex( item => item.name === $event.detail.value);
      let msg = String(vm.ui.radio_list[idx].id);
      if (msg === "0") msg = "reset"; // loxone requires reset instead of ID
      this.controlService.updateControl(vm.control, msg);
    }

    if (vm.control.type === 'light_controller_v2') {
      let idx = vm.ui.radio_list.findIndex( item => item.name === $event.detail.value);
      let msg = 'changeTo/' + String(vm.ui.radio_list[idx].id);
      this.controlService.updateControl(vm.control, msg);
    }

    if (vm.control.type === 'i_room_controller') {
      //TODO
    }
  }

}
