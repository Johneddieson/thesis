import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { LoginPage } from '../login/login.page';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
display: string
details
wholename: string
meReference: AngularFirestoreDocument
sub
  constructor(private afstore: AngularFirestore, private afauth: AngularFireAuth, private router: Router, private modal: ModalController) {    
    this.afauth.authState.subscribe(user => {
      if (user && user.uid) {
        this.meReference = this.afstore.collection('users').doc(`${user.uid}`)
        this.sub = this.meReference.get().pipe(map(actions => {
          return {
            id: actions.id,
            ...actions.data() as any
          }
        })).subscribe(data => {
          this.wholename = data.firstname
        })
      }
    })
    this.details = sessionStorage.getItem('user')
  }
  ngOnInit() {
    this.details = sessionStorage.getItem('user')
  }
  adminpage() {
    this.router.navigateByUrl('/admin/adminpage')
  }
  homepage() {
    this.router.navigateByUrl('/nurse/home') 
  }
  login() {
    this.modal.create({
     component: LoginPage,
     animated: true,
     mode: 'md',
     backdropDismiss: false,
     cssClass: 'login-modal',
   }).then((p) => {
  return  p.present();
   }).catch(err => {
     console.log(err)
   })
 }

  register() {
    this.modal.create({
     component: RegisterComponent,
     animated: true,
     mode: 'ios',
     backdropDismiss: false,
     cssClass: 'register-modal',
   }).then((s => {
   s.present();
 
   })).catch(err => {
     console.log(err)
   })

 }

}
