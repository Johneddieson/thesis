import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewondutyPage } from './viewonduty.page';

const routes: Routes = [
  {
    path: '',
    component: ViewondutyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewondutyPageRoutingModule {}
