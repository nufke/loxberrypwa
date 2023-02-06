import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from "rxjs/operators";
import { Control, Room, Category } from '../../interfaces/data.model';
import { TranslateService } from '@ngx-translate/core';
import { ControlService } from '../../services/control.service';
import { AlarmVM } from '../../interfaces/view.model';
import { ButtonAction, View } from '../../types/types';

var sprintf = require('sprintf-js').sprintf;

@Component({
  selector: 'control-alarm-view',
  templateUrl: 'control-alarm.view.html',
  styleUrls: ['./control-alarm.view.scss'],
})
export class ControlAlarmView
  implements OnInit, OnDestroy {

  @Input() control: Control;
  @Input() view: View;

  buttonType = ButtonAction;
  viewType = View;
  vm$: Observable<AlarmVM>;

  constructor(
    public translate: TranslateService,
    public controlService: ControlService) {
  }

  ngOnInit(): void {
    this.initVM();
  }

  ngOnDestroy(): void {
  }

  private initVM(): void {
    if (this.control == undefined) {
      console.error('Component \'control-alarm\' not available for rendering.');
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

  private updateVM(control: Control, categories: Category[], rooms: Room[]): AlarmVM {
    let room: Room = rooms.find(room => room.uuid === control.room && room.hwid === control.hwid);
    let category: Category = categories.find(category => category.uuid === control.category && category.hwid === control.hwid);

    let armed = Number(control.states.armed) ? true : false;
    let icon = armed ? 'assets/icons/svg/00000000-0000-000a-2200000000000000.svg' : 'assets/icons/svg/00000000-0000-000b-2200000000000000.svg'
    let text = armed ? 'Armed' : 'Disarmed';

    const vm: AlarmVM = {
      control: {
        ...control,
        icon: {
          href: icon,
          color: ''
        },
      },
      ui: {
        name: control.name,
        room: (room && room.name) ? room.name : "unknown",
        category: (category && category.name) ? category.name : "unknown",
        status: {
          text: text,
          color: "#9d9e9e" // TODO select from color palette
        },
        button: {
          armedTxt: armed ? 'Disarm alarm' : 'Arm alarm',
          armedDelayTxt: armed ? 'Disarm alarm' : 'Arm alarm with delay',
        },
        armed: armed,
      }
    };
    return vm;
  }

  armed(vm, event) {
    this.controlService.updateControl(vm.control, 'on');
  }

  armedDelayed(vm, event) {
    event.preventDefault();
    event.stopPropagation();
    this.controlService.updateControl(vm.control, 'delayedon');
  }

  showHistory(vm, event) {
  }
}
