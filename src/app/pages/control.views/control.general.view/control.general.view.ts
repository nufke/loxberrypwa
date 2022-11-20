import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ControlViewBase } from '../control.view.base';
import { LoxBerry } from '../../../providers/loxberry';

@Component({
  selector: 'app-control-general',
  templateUrl: 'control.general.view.html',
  styleUrls: ['./control.general.view.scss'],
})
export class ControlGeneralView extends ControlViewBase {

  constructor(
    private router: Router,
    public LoxBerryService: LoxBerry
  )
  {
    super(LoxBerryService);
  }

  ngOnInit() {
  }

}
