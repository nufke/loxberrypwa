import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from "rxjs/operators";
import { Control, Subcontrol, Room, Category } from '../../interfaces/data.model';
import { TranslateService } from '@ngx-translate/core';
import { ControlService } from '../../services/control.service';
import { RadioVM, RadioListItem } from '../../interfaces/view.model';
import { ButtonAction, View } from '../../types/types';

interface ListVM {
  control: Control;
  controls: Control[];
  ui: {
    name: string;
    room: string;
    category: string;
    status: {
      text: string;
      color: string;
    }
  }
}

@Component({
  selector: 'control-central-light-view',
  templateUrl: 'control-central-light.view.html',
  styleUrls: ['./control-central-light.view.scss'],
})
export class ControlCentralLightView
  implements OnInit, OnDestroy {

  @Input() control: Control;
  @Input() view: View;

  buttonType = ButtonAction;
  viewType = View;
  vm$: Observable<ListVM>;

  constructor(
    public translate: TranslateService,
    public controlService: ControlService) {
  }

  ngOnInit() : void {
    this.initVM();
  }

  ngOnDestroy() : void {
  }

  private initVM(): void {
    if (this.control == undefined) {
      console.error('Component \'control-central-light\' not available for rendering.');
      return;
    }

    this.vm$ = combineLatest([
      this.controlService.getControl$(this.control.hwid, this.control.uuid),
      this.controlService.controls$,
      this.controlService.categories$,
      this.controlService.rooms$,
    ]).pipe(
      map(([control, controls, categories, rooms]) => {
        return this.updateVM(control, controls, categories, rooms);
      })
    );
  }

  private updateVM(control: Control, controls: Control[], categories: Category[], rooms: Room[]): ListVM {
    let room: Room = rooms.find(room => room.uuid === control.room && room.hwid === control.hwid);
    let category: Category = categories.find(category => category.uuid === control.category && category.hwid === control.hwid);

    let controls_list = control.details.controls.map(control => control.uuid);;

    const vm: ListVM = {
      control: control,
      controls: controls.filter( controls => controls_list.indexOf(controls.uuid) > -1 )
                        .sort( (a, b) => ( a.order[1] - b.order[1] || a.name.localeCompare(b.name) ) ),
      ui: {
        name: control.name,
        room: room.name,
        category: category.name,
        status: {
          text: '',
          color: ''
        }
      }
    };
    return vm;
  }

  updateSegment() {
    // Close any open sliding items when the schedule updates
  }

  clickLightButton(action: ButtonAction, vm: RadioVM, $event) {
    $event.preventDefault();
    $event.stopPropagation();
  }
}
