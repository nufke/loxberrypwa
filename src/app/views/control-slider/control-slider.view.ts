import { Component, Input, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from "rxjs/operators";
import { Control, Room, Category } from '../../interfaces/data.model';
import { TranslateService } from '@ngx-translate/core';
import { ControlService } from '../../services/control.service';
import { SliderVM } from '../../interfaces/view.model';
import { ButtonAction, View } from '../../types/types';

var sprintf = require('sprintf-js').sprintf;

@Component({
  selector: 'control-slider-view',
  templateUrl: 'control-slider.view.html',
  styleUrls: ['./control-slider.view.scss'],
})
export class ControlSliderView
  implements OnInit {

  @Input() control: Control;
  @Input() view: View;

  buttonType = ButtonAction;
  viewType = View;

  vm$: Observable<SliderVM>;

  constructor(
    public translate: TranslateService,
    public controlService: ControlService) {
  }

  ngOnInit() {
    this.initVM();
  }

  private initVM(): void {
    if (this.control == undefined) {
      console.error('Component \'control-slider\' not available for rendering.');
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

        const vm: SliderVM = {
          control: control,
          ui: {
            name: control.name,
            room: (room && room.name) ? room.name : "unknown",
            category: (category && category.name) ? category.name : "unknown",
            slider: { position: Number(control.states.value) },
            status: {
              text: sprintf(control.details.format, control.states.value),
              color: "#9d9e9e" // TODO select from color palette
            }
          }
        };
        return vm;
      })
    );
  }

  // TODO reuse card-slider-view?
  clickSliderButton(action: ButtonAction, vm: SliderVM, $event) {
    $event.preventDefault();
    $event.stopPropagation();

    let min = Number(vm.control.details.min);
    let max = Number(vm.control.details.max);
    let step = Number(vm.control.details.step);
    let position: number;

    if (action === ButtonAction.PLUS) {
      position = vm.ui.slider.position + step;
    }
    else {
      position = vm.ui.slider.position - step;
    }

    if (position < min) position = min;
    if (position > max) position = max;

    this.controlService.updateControl(vm.control, String(position));
  }

}
