import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ControlService } from '../../services/control.service';
import { Control, ButtonAction } from '../../interfaces/datamodel';

interface SliderVM {
  control: Control;
  ui: {
    name: string;
    room: string;
    category: string;
    slider:  {
      position: number;
    }
    status: {
      text: string;
      color: string;
    }
  }
}

@Component({
  selector: 'card-slider-view',
  templateUrl: 'card-slider.view.html',
  styleUrls: ['./card-slider.view.scss'],
})
export class CardSliderView {

  @Input() vm: SliderVM;

  buttonType = ButtonAction;

  constructor(
    public translate: TranslateService,
    public controlService: ControlService) {
  }

  sliderChange(vm: SliderVM, $event) {
    if (vm.control.states.value != vm.ui.slider.position) {
      this.controlService.updateControl(vm.control, String(vm.ui.slider.position));
    }
  }

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
