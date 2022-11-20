import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ControlViewBase } from '../control.view.base';
import { LoxBerry } from '../../../providers/loxberry';

@Component({
  selector: 'app-control-text',
  templateUrl: 'control.text.view.html',
  styleUrls: ['./control.text.view.scss'],
})
export class ControlTextView extends ControlViewBase {

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
