import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminpagePage } from './adminpage.page';

const routes: Routes = [
  {
    path: '',
    component: AdminpagePage,
    children: [
      {
        path: 'viewonduty',
        loadChildren: () => import('../viewonduty/viewonduty.module').then( m => m.ViewondutyPageModule)
      },
      {
        path: 'createnurse',
        loadChildren: () => import('../createnurse/createnurse.module').then( m => m.CreatenursePageModule)
      },
      {
        path: 'createschedule',
        loadChildren: () => import('../createschedule/createschedule.module').then( m => m.CreateschedulePageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminpagePageRoutingModule {}
