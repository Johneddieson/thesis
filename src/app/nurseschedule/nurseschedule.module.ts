import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NurseschedulePageRoutingModule } from './nurseschedule-routing.module';

import { NurseschedulePage } from './nurseschedule.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NurseschedulePageRoutingModule
  ],
  declarations: [NurseschedulePage]
})
export class NurseschedulePageModule {}
