import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ControlView } from './control.view';

const routes: Routes = [
  {
    path: '',
    component: ControlView
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class ControlViewRoutingModule {}
