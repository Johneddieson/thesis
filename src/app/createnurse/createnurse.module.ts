import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatenursePageRoutingModule } from './createnurse-routing.module';

import { CreatenursePage } from './createnurse.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatenursePageRoutingModule
  ],
  declarations: [CreatenursePage]
})
export class CreatenursePageModule {}
