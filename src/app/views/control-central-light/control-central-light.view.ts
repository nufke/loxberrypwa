import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from "rxjs/operators";
import { Control, SubControl, Room, Category } from '../../interfaces/data.model';
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

  ngOnInit(): void {
    this.initVM();
  }

  ngOnDestroy(): void {
  }

  private initVM(): void {
    if (this.control == undefined) {
      console.error('Component \'control-central-light\' not available for rendering.');
      return;
    }

    this.vm$ = combineLatest([
      this.controlService.getControl$(this.control.serialNr, this.control.uuid),
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
    let room: Room = rooms.find(room => room.uuid === control.room && room.serialNr === control.serialNr);
    let category: Category = categories.find(category => category.uuid === control.category && category.serialNr === control.serialNr);

    let controlsList = control.details.controls.map(control => control.uuid);
    let filteredControls = controls.filter(controls => controlsList.indexOf(controls.uuid) > -1)

    let numLightsOn: number = controlsList.length;
    let text = '';
    let lightOn = false; // default off;

    filteredControls.forEach(control => {
      if (control.states.activeMoods[0])
       if (control.states.activeMoods[0] === 778) numLightsOn--;
    });

    /* sort using roon names, since this is used for the CentralLightController */
    let sortedControls = filteredControls.sort((a, b) => (
      this.getRoomName(rooms, a.serialNr, a.room).localeCompare(this.getRoomName(rooms, b.serialNr, b.room))));

    switch (numLightsOn) {
      case 0:
        text = this.translate.instant('All') + ' ' + this.translate.instant('Lights off').toLowerCase();
        lightOn = false;
        break;
      case 1:
        text = '1 ' + this.translate.instant('Light on').toLowerCase();;
        lightOn = true;
        break;
      case controlsList.length:
        text = this.translate.instant('All') + ' ' + this.translate.instant('Lights on').toLowerCase();
        lightOn = true;
        break;
      default:
        text = numLightsOn + ' ' + this.translate.instant('Lights on').toLowerCase();
        lightOn = true;
    }

    const vm: ListVM = {
      control: {
        ...control,
        icon: {
          href: control.icon.href,
          color: lightOn ? "primary" : "#9d9e9e" // TODO select from color palette
        }
      },
      controls: sortedControls,
      ui: {
        name: control.name,
        room: room.name,
        category: category.name,
        status: {
          text: text,
          color: lightOn ? "#69c350" : "#9d9e9e", // TODO use color palette
        }
      }
    };
    return vm;
  }

  getRoomName(rooms: Room[], serialNr: string, uuid: string): string{
    return rooms.find(room => room.uuid === uuid && room.serialNr === serialNr).name;
  }

  updateSegment() {
    // Close any open sliding items when the schedule updates
  }

  clickLightButton(action: ButtonAction, vm: RadioVM, $event) {
    $event.preventDefault();
    $event.stopPropagation();
  }
}
