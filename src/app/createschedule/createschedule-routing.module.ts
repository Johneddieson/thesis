import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateschedulePage } from './createschedule.page';

const routes: Routes = [
  {
    path: '',
    component: CreateschedulePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateschedulePageRoutingModule {}
