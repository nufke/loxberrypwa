import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
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
  implements OnInit, OnDestroy {

  viewType = View;
  vm$: Observable<ControlListVM>;

  constructor(
    public translate: TranslateService,
    private controlService: ControlService) {
      this.initVM();
  }

  ngOnInit() : void {
    this.initVM();
  }

  ngOnDestroy() : void {
  }

  private initVM() : void {
    this.vm$ = this.controlService.controls$.pipe(
      map( controls => {
        controls = controls
        .filter( control => (control.order[2] > 0) && control.is_visible )
        .sort( (a, b) => ( a.order[2] - b.order[2] || a.name.localeCompare(b.name) ) );
        const vm: ControlListVM = {
          controls: null,
          favorites: controls
        };
        return vm;
      })
    );
  }

}
