import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateschedulePageRoutingModule } from './createschedule-routing.module';

import { CreateschedulePage } from './createschedule.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateschedulePageRoutingModule
  ],
  declarations: [CreateschedulePage]
})
export class CreateschedulePageModule {}
