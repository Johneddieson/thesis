import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminpagePageRoutingModule } from './adminpage-routing.module';

import { AdminpagePage } from './adminpage.page';
import { NotificationComponent } from '../notification/notification.component';
import { AccountsettingsComponent } from '../accountsettings/accountsettings.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminpagePageRoutingModule
  ],
  declarations: [AdminpagePage, NotificationComponent, AccountsettingsComponent]
})
export class AdminpagePageModule {}
