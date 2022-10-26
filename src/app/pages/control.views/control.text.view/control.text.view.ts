import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ControlViewBase } from '../control.view.base';

@Component({
  selector: 'app-control-text',
  templateUrl: 'control.text.view.html',
  styleUrls: ['./control.text.view.scss'],
})
export class ControlTextView extends ControlViewBase {

  constructor(
    private router: Router
  )
  {
    super();
  }

  ngOnInit() {
  }

}
