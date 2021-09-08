import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatenursePage } from './createnurse.page';

const routes: Routes = [
  {
    path: '',
    component: CreatenursePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatenursePageRoutingModule {}
