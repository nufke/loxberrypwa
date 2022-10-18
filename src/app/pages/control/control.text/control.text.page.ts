import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ControlBase } from '../control.base';

@Component({
  selector: 'app-control-text',
  templateUrl: 'control.text.page.html',
  styleUrls: ['./control.text.page.scss'],
})
export class ControlTextPage extends ControlBase {

  constructor(
    private router: Router
  )
  {
    super();
  }

  ngOnInit() {
  }

}
