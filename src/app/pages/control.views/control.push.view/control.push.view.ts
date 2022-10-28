import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ControlViewBase } from '../control.view.base';
import { LoxBerry } from '../../../providers/loxberry';

@Component({
  selector: 'app-control-push',
  templateUrl: 'control.push.view.html',
  styleUrls: ['./control.push.view.scss'],
})
export class ControlPushView extends ControlViewBase {
  //public a: Number = 0;
  constructor(
    private router: Router,
    public LoxBerryService: LoxBerry
  )
  {
    super();
  }

  ngOnInit() {
  }

  pushed() {
    //if (this.a) this.a=0;
    //else this.a=1;
    this.LoxBerryService.sendMessage(this.control, '/state/value', '1', 0); // note: no retain state for push button
  }

}
