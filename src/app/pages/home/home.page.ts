import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from "rxjs/operators";
import { TranslateService } from '@ngx-translate/core';
import { ControlListVM } from '../../interfaces/view.model';
import { ControlService } from '../../services/control.service';
import { View } from '../../types/types';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage
  implements OnInit {

  viewType = View;
  public vm$: Observable<ControlListVM>;

  constructor(
    public translate: TranslateService,
    private controlService: ControlService)
  {
    this.initVM();
  }

  private initVM() : void {
    this.vm$ = combineLatest([
      this.controlService.controls$,
      this.controlService.categories$,
      this.controlService.rooms$,
      ]).pipe(
      map( ([controls, categories, rooms]) => {
        controls = controls
        .filter( control => control.is_favorite && control.is_visible )
        .sort( (a, b) => ( a.order - b.order || a.name.localeCompare(b.name) ) );
        const vm: ControlListVM = {
          controls: controls
        };
        return vm;
      })
    );
  }

  ngOnInit() : void {
  }

}
