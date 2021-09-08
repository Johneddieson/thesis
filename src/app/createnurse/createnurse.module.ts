import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatenursePageRoutingModule } from './createnurse-routing.module';

import { CreatenursePage } from './createnurse.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreatenursePageRoutingModule
  ],
  declarations: [CreatenursePage]
})
export class CreatenursePageModule {}
