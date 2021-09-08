import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NurseschedulePage } from './nurseschedule.page';

const routes: Routes = [
  {
    path: '',
    component: NurseschedulePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NurseschedulePageRoutingModule {}
