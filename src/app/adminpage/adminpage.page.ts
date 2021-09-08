import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { userInfo } from 'os';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { PopoverController } from '@ionic/angular';
import { NotificationComponent } from '../notification/notification.component';
import { AccountsettingsComponent } from '../accountsettings/accountsettings.component';
@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.page.html',
  styleUrls: ['./adminpage.page.scss'],
})
export class AdminpagePage implements OnInit {
meReference: AngularFirestoreDocument
sub;
wholename
details: any = []
  constructor(private auth: AuthService, private popOver: PopoverController, private afstore: AngularFirestore, private afauth: AngularFireAuth) {
  this.details = JSON.parse(sessionStorage.getItem('user'))
   }
  ngOnInit() {
  history.pushState(null, document.title, location.href);
  window.addEventListener('popstate', function(event) {
    history.pushState(null, document.title, location.href)
  })
  }
  openNotifications(ev)
  {
    this.popOver.create({
      component: NotificationComponent,
      event: ev,
      translucent: true,
      
    }).then(el => {
      el.present()

    })
  }
  openaccountsettings(ev) {
    this.popOver.create({
      component: AccountsettingsComponent,
      event: ev,
      translucent: true,
      cssClass: 'my-custom-class'
    }).then(el => {
      el.present()
    })
  }
 async dismiss() {
    await this.popOver.dismiss()
  }
}
