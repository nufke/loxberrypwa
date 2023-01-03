import { Component, OnInit, Input } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from "rxjs/operators";
import { Control, Subcontrol, Room, Category, View, ButtonAction } from '../../interfaces/datamodel';
import { TranslateService } from '@ngx-translate/core';
import { ControlService } from '../../services/control.service';
import { Utils } from '../../utils/utils';

interface DimmerVM {
  control: Control;
  subcontrol: Subcontrol;
  ui: {
    name: string;
    btn_color: string;
    slider: {
      position: number;
      min: number;
      max: number;
      step: number;
      color: string;
    }
  }
  rgb?: number[];
}

@Component({
  selector: 'card-dimmer-view',
  templateUrl: 'card-dimmer.view.html',
  styleUrls: ['./card-dimmer.view.scss'],
})
export class CardDimmerView
  implements OnInit {

  @Input() control: Control;
  @Input() subcontrol: Subcontrol;
  @Input() view: View;

  vm$: Observable<DimmerVM>;
  buttonType = ButtonAction;
  viewType = View;

  constructor(
    public translate: TranslateService,
    public controlService: ControlService) {
  }

  ngOnInit() {
    this.initVM();
  }

  private initVM(): void {
    if ((this.subcontrol == undefined)||(this.control == undefined)) {
      console.error('Component \'card-dimmer\' not available for rendering.');
      return;
    }

    this.vm$ = combineLatest([
      this.controlService.getControl(this.control.hwid, this.control.uuid),
      this.controlService.getSubcontrol(this.control.hwid, this.control.uuid, this.subcontrol.uuid),
    ]).pipe(
      map(([control, subcontrol]) => {
        // not all dimmer controls define the limits, instead use some defaults
        let min = (subcontrol.states.min == undefined || subcontrol.states.min === '') ? 0 : Number(subcontrol.states.min);
        let max = (subcontrol.states.max == undefined  || subcontrol.states.max === '') ? 100 : Number(subcontrol.states.max);
        let step = (subcontrol.states.step == undefined || subcontrol.states.step === '') ? 1 : Number(subcontrol.states.step);

        let position: number = 0;
        let slider_color: string = '';
        let button_color: string = '';
        let rgb: number[] = [];

        if (subcontrol.type === 'dimmer') {
          position = Number(subcontrol.states.position);
          slider_color = '-webkit-linear-gradient(left, rgba(49,56,62, 1), rgb(255, 229, 127))';
          button_color = 'rgba(255, 229, 127,' + (position/100) + ')';
        }

        if (subcontrol.type === 'color_picker_v2') {
          let hsv = subcontrol.states.color.match(/hsv\(([0-9]*),([0-9]*),([0-9]*)\)/);
          if (hsv) {
            position = Number(hsv[3]);
            let rgb = Utils.hsv2rgb(Number(hsv[1]), Number(hsv[2]), 100);
            slider_color = '-webkit-linear-gradient(left, rgba(49,56,62, 1), rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + '))';
            button_color = 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + (position/100) + ')';
          }
        }

        const vm: DimmerVM = {
          control: control,
          subcontrol: subcontrol,
          ui: {
            name: (this.view === View.DETAILED) ? subcontrol.name : this.translate.instant('Brightness'),
            btn_color: (position < 10) ? '#31373e' : button_color, // TODO update for white template
            slider: {
              position: position,
              min: min,
              max: max,
              step: step,
              color: slider_color,
            },
          },
          rgb: rgb,
        };
        return vm;
      })
    );
  }

  sliderChange(vm: DimmerVM, $event) {
    if (vm.subcontrol.type === 'dimmer') {
      if (vm.subcontrol.states.position != vm.ui.slider.position) {
        this.controlService.updateControl(vm.subcontrol, String(vm.ui.slider.position));
      }
    }

    if (vm.subcontrol.type === 'color_picker_v2') {
      let hsv = vm.subcontrol.states.color.match(/hsv\(([0-9]*),([0-9]*),([0-9]*)\)/);
       if (hsv[3] != vm.ui.slider.position) {
        let color = 'hsv(' + hsv[1] + ',' + hsv[2] + ',' + vm.ui.slider.position + ')';
        this.controlService.updateControl(vm.subcontrol, color);
      }
    }
  }

  clickDimmerButton(action: ButtonAction, vm: DimmerVM, $event) {
    $event.preventDefault();
    $event.stopPropagation();

    let position: number;

    if (action === ButtonAction.UP) {
      position = vm.ui.slider.position + vm.ui.slider.step;
    }
    else {
      position = vm.ui.slider.position - vm.ui.slider.step;
    }

    if (position < vm.ui.slider.min) position = vm.ui.slider.min;
    if (position > vm.ui.slider.max) position = vm.ui.slider.max;

    if (vm.subcontrol.type === 'dimmer') {
      this.controlService.updateControl(vm.subcontrol, String(position));
    }

    if (vm.subcontrol.type === 'color_picker_v2') {
      let hsv = vm.subcontrol.states.color.match(/hsv\(([0-9]*),([0-9]*),([0-9]*)\)/);
      let color = 'hsv(' + hsv[1] + ',' + hsv[2] + ',' + position + ')';
      this.controlService.updateControl(vm.subcontrol, color);
    }
  }

}
