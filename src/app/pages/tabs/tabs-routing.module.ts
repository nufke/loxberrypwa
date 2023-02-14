import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
//import { AuthGuard } from '../../guards/auth.guard'; // TODO add guards

const routes: Routes = [
  {
    path: 'app',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../controls/controls.module').then(m => m.ControlsPageModule),
        //canActivate: [AuthGuard]
      },
      {
        path: 'room',
        loadChildren: () => import('../rooms/rooms.module').then(m => m.RoomsPageModule),
        //canActivate: [AuthGuard]
      },
      {
        path: 'category',
        loadChildren: () => import('../categories/categories.module').then(m => m.CategoriesPageModule),
        //canActivate: [AuthGuard]
      },
      {
        path: ':domain/:hwid/:uuid',
        loadChildren: () => import('../controls/controls.module').then(m => m.ControlsPageModule),
        //canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'app/home/:control_hwid/:control_uuid',
    loadChildren: () => import('../detailed-control/detailed-control.module').then(m => m.DetailedControlPageModule),
    //canActivate: [AuthGuard]
  },
  {
    path: 'app/:domain/:hwid/:uuid/:control_hwid/:control_uuid',
    loadChildren: () => import('../detailed-control/detailed-control.module').then(m => m.DetailedControlPageModule),
    //canActivate: [AuthGuard]
  },
  {
    path: 'app/:domain/:hwid/:uuid/:control_hwid/:control_uuid/:subcontrol_uuid',
    loadChildren: () => import('../detailed-control/detailed-control.module').then(m => m.DetailedControlPageModule),
    //canActivate: [AuthGuard]
  },
  {
    path: 'app/:domain/:hwid/:uuid/:control_hwid/:control_uuid/:subcontrol_uuid/:subcontrol_uuid_ext',
    loadChildren: () => import('../detailed-control/detailed-control.module').then(m => m.DetailedControlPageModule),
    //canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '/app/home',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
