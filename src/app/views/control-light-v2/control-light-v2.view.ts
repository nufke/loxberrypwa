import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Observable, combineLatest, Subject } from 'rxjs';
import { map, takeUntil } from "rxjs/operators";
import { Control, Subcontrol, Room, Category } from '../../interfaces/data.model';
import { TranslateService } from '@ngx-translate/core';
import { ControlService } from '../../services/control.service';
import { RadioVM, RadioListItem } from '../../interfaces/view.model';
import { ButtonAction, View } from '../../types/types';

@Component({
  selector: 'control-light-v2-view',
  templateUrl: 'control-light-v2.view.html',
  styleUrls: ['./control-light-v2.view.scss'],
})
export class ControlLightV2View
  implements OnInit, OnDestroy {

  @Input() control: Control;
  @Input() view: View;

  buttonType = ButtonAction;
  viewType = View;
  vm$: Observable<RadioVM>;
  segment: string = 'moods';
  entries: RadioListItem[];
  mood_list: RadioListItem[];
  text: string;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public translate: TranslateService,
    public controlService: ControlService) {
  }

  ngOnInit() : void {
    this.initVM();
  }

  ngOnDestroy() : void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private initVM(): void {
    if (this.control == undefined) {
      console.error('Component \'control-light-v2\' not available for rendering.');
      return;
    }

    this.vm$ = combineLatest([
      this.controlService.getControl$(this.control.hwid, this.control.uuid),
      this.controlService.categories$,
      this.controlService.rooms$,
    ]).pipe(
      map(([control, categories, rooms]) => {
        return this.updateVM(control, categories, rooms);
      }),
      takeUntil(this.destroy$)
    );
  }

  private updateVM(control: Control, categories: Category[], rooms: Room[]): RadioVM {
    let room: Room = rooms.find(room => room.uuid === control.room && room.hwid === control.hwid);
    let category: Category = categories.find(category => category.uuid === control.category && category.hwid === control.hwid);
    let selected_id = control.states.active_moods[0];

    /* only update radio_list if we have new entries, since it might cause GUI interruptions */
    if (this.entries !== control.states.mood_list) {
      this.mood_list = control.states.mood_list;

      if (this.mood_list) {
        if (selected_id) {
          let mood_idx = this.mood_list.findIndex(item => { return item.id == selected_id });
          this.text = this.mood_list[mood_idx].name;
        }
        else
          this.text = this.translate.instant('Manual');
      }
    }

    let visibleSubcontrols = [];

    if (control.subcontrols) {
      let allSubcontrols: Subcontrol[] = Object.values(control.subcontrols);
      visibleSubcontrols = allSubcontrols.filter( subcontrol => subcontrol.is_visible );
    }

    const vm: RadioVM = {
      control: {
        ...control,
        icon: {
          href: control.icon.href,
          color: (selected_id != 778) ? "primary" : "#9d9e9e" }
        }, // TODO select from color palette
      ui: {
        name: control.name,
        room: (room && room.name) ? room.name : "unknown",
        category: (category && category.name) ? category.name : "unknown",
        radio_list: this.mood_list,
        selected_id: selected_id,
        status: {
          text: this.text,
          color: (selected_id != 778) ? "#69c350" : "#9d9e9e" // TODO select from color palette
        }
      },
      subcontrols: visibleSubcontrols,
    };
    return vm;
  }


  updateSegment() {
    // Close any open sliding items when the schedule updates
  }

  clickLightButton(action: ButtonAction, vm: RadioVM, $event) {
    $event.preventDefault();
    $event.stopPropagation();

    let id = this.control.states.active_moods[0];
    let mood_idx;
    let mood_list = this.control.states.mood_list;

    let max = vm.ui.radio_list.length - 1;

    if (vm.ui.selected_id && vm.ui.radio_list) {
      mood_idx = vm.ui.radio_list.findIndex(item => { return item.id == vm.ui.selected_id });
      mood_idx++;
      if (mood_idx > max) mood_idx = 0;
    }
    else {
      mood_idx = 0;
    }
    this.controlService.updateControl(vm.control, 'changeTo/' + String(mood_list[mood_idx].id));
  }

}
