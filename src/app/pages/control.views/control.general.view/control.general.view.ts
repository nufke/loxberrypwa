import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ControlViewBase } from '../control.view.base';

@Component({
  selector: 'app-control-general',
  templateUrl: 'control.general.view.html',
  styleUrls: ['./control.general.view.scss'],
})
export class ControlGeneralView extends ControlViewBase {

  constructor(
    private router: Router
  )
  {
    super();
  }

  ngOnInit() {
  }

}
