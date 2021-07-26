import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewondutyPageRoutingModule } from './viewonduty-routing.module';

import { ViewondutyPage } from './viewonduty.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewondutyPageRoutingModule
  ],
  declarations: [ViewondutyPage]
})
export class ViewondutyPageModule {}
