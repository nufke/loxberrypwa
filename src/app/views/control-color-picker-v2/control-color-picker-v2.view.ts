import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from "rxjs/operators";
import { Control, Subcontrol } from '../../interfaces/data.model';
import { TranslateService } from '@ngx-translate/core';
import { ControlService } from '../../services/control.service';
import { ColorPickerVM } from '../../interfaces/view.model';
import { View } from '../../types/types';
import { Utils } from '../../utils/utils';

@Component({
  selector: 'control-color-picker-v2.view',
  templateUrl: 'control-color-picker-v2.view.html',
  styleUrls: ['./control-color-picker-v2.view.scss'],
})
export class ControlColorPickerV2View
  implements OnInit, OnDestroy {

  @Input() control: Control;
  @Input() subcontrol: Subcontrol;
  @Input() view: View;

  vm$: Observable<ColorPickerVM>;
  segment: string = 'color';
  mode_rgb: Boolean;

  constructor(
    public translate: TranslateService,
    public controlService: ControlService) {
    this.mode_rgb = true;
  }

  ngOnInit(): void {
    this.initVM();
  }

  ngOnDestroy(): void {
  }

  private initVM(): void {
    if ((this.subcontrol == undefined)||(this.control == undefined)) {
      console.error('Component \'control-color-picker-v2\' not available for rendering.');
      return;
    }

    this.vm$ = combineLatest([
      this.controlService.getControl$(this.control.hwid, this.control.uuid),
      this.controlService.getSubcontrol$(this.control.hwid, this.control.uuid, this.subcontrol.uuid),
    ]).pipe(
      map(([control, subcontrol]) => {
        return this.updateVM(control, subcontrol);
      })
    );
  }

  private updateVM(control: Control, subcontrol: Subcontrol): ColorPickerVM {
    let hsv = subcontrol.states.color.match(/hsv\(([0-9]*),([0-9]*),([0-9]*)\)/);
    let rgb = Utils.hsv2rgb(Number(hsv[1]), Number(hsv[2]), 100); // use maximum luninance (100%)
    const vm: ColorPickerVM = {
      control: control,
      subcontrol: subcontrol,
      rgb: {r: rgb[0], g: rgb[1], b: rgb[2]},
      position: Number(hsv[3]),
    };
    return vm;
  }

  updateSegment() {
    // Close any open sliding items when the schedule updates
  }

  toggleMode() {
    this.mode_rgb = !this.mode_rgb;
  }

}
