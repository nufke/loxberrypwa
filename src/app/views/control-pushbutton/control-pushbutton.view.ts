import { Component, Input, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from "rxjs/operators";
import { Control, Room, Category, View, ButtonAction } from '../../interfaces/datamodel';
import { TranslateService } from '@ngx-translate/core';
import { ControlService } from '../../services/control.service';

interface PushVM {
  control: Control;
  ui: {
    room: string;
    category: string;
    status: {
      text: string;
      color: string;
    }
  }
}

@Component({
  selector: 'control-pushbutton-view',
  templateUrl: 'control-pushbutton.view.html',
  styleUrls: ['./control-pushbutton.view.scss'],
})
export class ControlPushbuttonView
  implements OnInit {

  @Input() control: Control;
  @Input() view: View;

  buttonType = ButtonAction;
  viewType = View;

  vm$: Observable<PushVM>;

  constructor(
    public translate: TranslateService,
    public controlService: ControlService) {
  }

  ngOnInit() {
    this.initVM();
  }

  private initVM(): void {
    if (this.control == undefined) {
      console.error('Component \'control-pushbutton\' not available for rendering.');
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

        const vm: PushVM = {
          control: control,
          ui: {
            room: (room && room.name) ? room.name : "unknown",
            category: (category && category.name) ? category.name : "unknown",
            status: {
              text: control.details.active,
              color: "#9d9e9e" // TODO select from color palette
            }
          }
        };
        return vm;
      })
    );
  }

  clickPushButton(action: ButtonAction, vm: PushVM, $event) {
    $event.preventDefault();
    $event.stopPropagation();
    this.controlService.updateControl(vm.control, 'pulse');
  }

}
