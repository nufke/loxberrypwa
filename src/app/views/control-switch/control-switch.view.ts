import { Component, Input, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from "rxjs/operators";
import { Control, Room, Category, View, ButtonAction } from '../../interfaces/datamodel';
import { TranslateService } from '@ngx-translate/core';
import { ControlService } from '../../services/control.service';

interface RadioListItem {
  id: number;
  name: string;
}

interface VM {
  control: Control;
  ui: {
    name: string;
    room: string;
    category: string;
    radio_list: RadioListItem[];
    status: {
      text: string;
      color: string;
    }
    toggle: boolean;
  }
}

@Component({
  selector: 'control-switch-view',
  templateUrl: 'control-switch.view.html',
  styleUrls: ['./control-switch.view.scss'],
})
export class ControlSwitchView
  implements OnInit {

  @Input() control: Control;
  @Input() view: View;

  buttonType = ButtonAction;
  viewType = View;

  vm$: Observable<VM>;

  constructor(
    public translate: TranslateService,
    public controlService: ControlService) {
  }

  ngOnInit() {
    this.initVM();
  }

  private initVM(): void {
    if (this.control == undefined) {
      console.error('Component \'control-switch\' not available for rendering.');
      return;
    }

    this.vm$ = combineLatest([
      this.controlService.getControl(this.control.hwid, this.control.uuid),
      this.controlService.categories$,
      this.controlService.rooms$,
    ]).pipe(
      map(([control, categories, rooms]) => {
        let room: Room = rooms.find(room => room.uuid === control.room && room.hwid === control.hwid);
        let category: Category = categories.find(category => category.uuid === control.category && category.hwid === control.hwid);
        let switchstate = (control.states.active === "1");

        const vm: VM = {
          control: { ...control, icon: { href: control.icon.href, color: switchstate ? "primary" : "#9d9e9e" } }, // TODO select from color palette
          ui: {
            name: control.name,
            room: (room && room.name) ? room.name : "unknown",
            category: (category && category.name) ? category.name : "unknown",
            radio_list: [
              { id: 0, name: this.translate.instant('Off')},
              { id: 1, name: this.translate.instant('On')}
            ],
            status: {
              text: switchstate ? this.translate.instant('On') : this.translate.instant('Off'),
              color: switchstate ? "#69c350" /* primary */ : "#9d9e9e", // TODO select from color palette
            },
            toggle: switchstate,
          }
        };
        return vm;
      })
    );
  }

  clickToggle(vm: VM, $event) {
    $event.preventDefault();
    $event.stopPropagation();

    if (vm.ui.toggle) {
      this.controlService.updateControl(vm.control, 'Off');
    }
    else {
      this.controlService.updateControl(vm.control, 'On');
    }
  }

  radioChange(vm: VM, $event) {
    console.log('radioChange', $event);
    $event.preventDefault();
    $event.stopPropagation();
  }

}
