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

  constructor(
    private router: Router,
    public LoxBerryService: LoxBerry
  )
  {
    super(LoxBerryService);
  }

  ngOnInit() {
  }

  pushed() {
    this.LoxBerryService.sendMessage(this.control, '1');
  }

}
