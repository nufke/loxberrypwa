import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
//import { AuthGuard } from '../../guards/auth.guard'; // TODO add guards

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'favorites',
        loadChildren: () => import('../favorites/favorites.module').then(m => m.FavoritesPageModule),
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
      },
      {
        path: ':domain/:hwid/:uuid/:control_hwid/:control_uuid',
        loadChildren: () => import('../control/control.module').then(m => m.ControlPageModule),
        //canActivate: [AuthGuard]
      },
      {
        path: '',
        redirectTo: '/favorites',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
