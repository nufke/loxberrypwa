import { Component, Input, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from "rxjs/operators";
import { Control, Subcontrol, Room, Category, View, ButtonAction } from '../../interfaces/datamodel';
import { TranslateService } from '@ngx-translate/core';
import { ControlService } from '../../services/control.service';

interface SwitchVM {
  control: Control;
  subcontrol: Subcontrol;
  ui: {
    name: string;
    status: {
      text: string;
      color: string;
    }
    toggle: boolean;
  }
}

@Component({
  selector: 'card-switch-view',
  templateUrl: 'card-switch.view.html',
  styleUrls: ['./card-switch.view.scss'],
})
export class CardSwitchView
  implements OnInit {

  @Input() control: Control;
  @Input() subcontrol: Subcontrol;

  vm$: Observable<SwitchVM>;

  constructor(
    public translate: TranslateService,
    public controlService: ControlService) {
  }

  ngOnInit() {
    this.initVM();
  }

  private initVM(): void {
    if ((this.subcontrol == undefined)||(this.control == undefined)) {
      console.error('Subcontrol component \'card-switch\' not available for rendering.');
      return;
    }

    this.vm$ = combineLatest([
      this.controlService.getControl(this.control.hwid, this.control.uuid),
      this.controlService.getSubcontrol(this.control.hwid, this.control.uuid, this.subcontrol.uuid),
    ]).pipe(
      map(([control, subcontrol]) => {
        let switchstate = (subcontrol.states.active === "1");
        const vm: SwitchVM = {
          control: control,
          subcontrol: subcontrol,
          ui: {
            name: subcontrol.name,
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

  clickToggle(vm: SwitchVM, $event) {
    $event.preventDefault();
    $event.stopPropagation();

    if (vm.ui.toggle) {
      this.controlService.updateControl(vm.subcontrol, 'Off');
    }
    else {
      this.controlService.updateControl(vm.subcontrol, 'On');
    }
  }
}
