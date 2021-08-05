import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { userInfo } from 'os';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth.service';
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
  constructor(private auth: AuthService, private afstore: AngularFirestore, private afauth: AngularFireAuth) {
  this.details = JSON.parse(sessionStorage.getItem('user'))
   }
  ngOnInit() {
  history.pushState(null, document.title, location.href);
  window.addEventListener('popstate', function(event) {
    history.pushState(null, document.title, location.href)
  })
  }
}
