import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { AccountsettingsComponent } from '../accountsettings/accountsettings.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(private popOverCtrl: PopoverController) { }

  ngOnInit() {
    history.pushState(null, document.title, location.href);
    window.addEventListener('popstate', function(event) {
      history.pushState(null, document.title, location.href)
    })
  }

  openaccountsettings(ev) {
    this.popOverCtrl.create({
      component: AccountsettingsComponent,
      event: ev,
      translucent: true,
      cssClass: 'my-custom-class'
    }).then(el => {
      el.present()
    })
  }
}
