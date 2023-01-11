import { Component, Input, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from "rxjs/operators";
import { Control, Room, Category } from '../../interfaces/data.model';
import { TranslateService } from '@ngx-translate/core';
import { ControlService } from '../../services/control.service';
import { RadioVM } from '../../interfaces/view.model';
import { ButtonAction, View } from '../../types/types';

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

  vm$: Observable<RadioVM>;

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
      this.controlService.getControl$(this.control.hwid, this.control.uuid),
      this.controlService.categories$,
      this.controlService.rooms$,
    ]).pipe(
      map(([control, categories, rooms]) => {
        return this.updateVM(control, categories, rooms);
      })
    );
  }

  private updateVM(control: Control, categories: Category[], rooms: Room[]): RadioVM {
    let room: Room = rooms.find(room => room.uuid === control.room && room.hwid === control.hwid);
    let category: Category = categories.find(category => category.uuid === control.category && category.hwid === control.hwid);
    let switchstate = (control.states.active === "1");

    const vm: RadioVM = {
      control: { ...control, icon: { href: control.icon.href, color: switchstate ? "primary" : "#9d9e9e" } }, // TODO select from color palette
      ui: {
        name: control.name,
        room: (room && room.name) ? room.name : "unknown",
        category: (category && category.name) ? category.name : "unknown",
        radio_list: [
          { id: 0, name: this.translate.instant('Off')},
          { id: 1, name: this.translate.instant('On')}
        ],
        selected_id: switchstate ? 1 : 0,
        status: {
          text: switchstate ? this.translate.instant('On') : this.translate.instant('Off'),
          color: switchstate ? "#69c350" /* primary */ : "#9d9e9e", // TODO select from color palette
        },
        toggle: switchstate,
      }
    };
    return vm;
  }

  clickToggle(vm: RadioVM, $event) {
    $event.preventDefault();
    $event.stopPropagation();

    if (vm.ui.toggle) {
      this.controlService.updateControl(vm.control, 'Off');
    }
    else {
      this.controlService.updateControl(vm.control, 'On');
    }
  }

  radioChange(vm: RadioVM, $event) {
    $event.preventDefault();
    $event.stopPropagation();
    let idx = vm.ui.radio_list.findIndex( item => item.name === $event.detail.value);
    if (idx) {
      this.controlService.updateControl(vm.control, 'On');
    }
    else {
      this.controlService.updateControl(vm.control, 'Off');
    }
  }

}
