import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-accountsettings',
  templateUrl: './accountsettings.component.html',
  styleUrls: ['./accountsettings.component.scss'],
})
export class AccountsettingsComponent implements OnInit {

  constructor(private auth: AuthService, private popOver: PopoverController) { }

  ngOnInit() {}

 async logout() {
    this.auth.SignOut()
  this.dismiss()
  }
  async dismiss() {
await    this.popOver.dismiss()

  }
}
