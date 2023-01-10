import { Component, Input, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from "rxjs/operators";
import { Control, Room, Category } from '../../interfaces/data.model';
import { TranslateService } from '@ngx-translate/core';
import { ControlService } from '../../services/control.service';
import { RadioVM } from '../../interfaces/view.model';
import { ButtonAction, View } from '../../types/types';

@Component({
  selector: 'control-radio-view',
  templateUrl: 'control-radio.view.html',
  styleUrls: ['./control-radio.view.scss'],
})
export class ControlRadioView
  implements OnInit {

  @Input() control: Control;
  @Input() view: View;

  buttonType = ButtonAction;
  viewType = View;

  vm$: Observable<RadioVM>;

  segment: string = 'moods';
  entries;
  radio_list;

  constructor(
    public translate: TranslateService,
    public controlService: ControlService) {
  }

  ngOnInit() {
    this.initVM();
  }

  private initVM(): void {
    if (this.control == undefined) {
      console.error('Component \'control-radio\' not available for rendering.');
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
    let selected_id = Number(control.states.active_output);
    if (!selected_id) selected_id = 0;

    /* only update radio_list if we have new entries, since it might cause GUI interruptions */
    if (this.entries !== control.details.outputs) {
      this.entries = control.details.outputs;
      this.radio_list = [{ id: 0, name: control.details.all_off }]
        .concat(Object.entries(control.details.outputs).map(entry => ({ id: Number(entry[0]), name: String(entry[1]) })));
    }
    let idx = this.radio_list.findIndex(item => { return item.id === selected_id });

    const vm: RadioVM = {
      control: control,
      ui: {
        name: control.name,
        room: (room && room.name) ? room.name : "unknown",
        category: (category && category.name) ? category.name : "unknown",
        radio_list: this.radio_list,
        selected_id: selected_id,
        status: {
          text: String(this.radio_list[idx].name),
          color: (selected_id > 0) ? "#69c350" : "#9d9e9e" // TODO select from color palette
        }
      }
    };
    return vm;
  }

  clickRadioButton(action: ButtonAction, vm: RadioVM, $event) {
    $event.preventDefault();
    $event.stopPropagation();

    let min: number = 0;
    let max: number = vm.ui.radio_list.length - 1;
    let idx: number = vm.ui.radio_list.findIndex(item => { return item.id === vm.ui.selected_id });

    if (action === ButtonAction.PLUS) idx++;
    else idx--;

    if (idx > max) {
      idx = min;
    }
    else {
      if (idx < min) {
        idx = max;
      }
    }

    vm.ui.selected_id = vm.ui.radio_list[idx].id;

    let msg = String(vm.ui.radio_list[idx].id);
    if (msg === "0") msg = "reset"; // loxone requires text "reset" instead of ID

    this.controlService.updateControl(vm.control, msg);
  }

}
