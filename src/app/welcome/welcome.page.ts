import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
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
wholename: string
meReference: AngularFirestoreDocument
sub
details: any = []
isAndroid: boolean = false;
isIos: boolean = false;
subscribe: any;
myname: string;
role: string
count;
disp
  constructor(private afstore: AngularFirestore, private afauth: AngularFireAuth, private router: Router, private modal: ModalController) {    
  //  setInterval(() => {
  
  //   this.details = JSON.parse(sessionStorage.getItem('user'))
  //      if (this.details != null){
  //       this.meReference = this.afstore.collection('users').doc(`${this.details.uid}`)
  //     this.sub = this.meReference.valueChanges().subscribe(data => {
        
  //       this.myname = `${data.firstname} ${data.surname}`
  //       this.role = data.role
        
  //     })
  //      } else {
  //        this.myname = "";
  //        this.role = "";
  //      }
  // }, 100)
      
    }
  ngOnInit() {
    setInterval(() => {
      this.details = JSON.parse(sessionStorage.getItem('user'))
      if (this.details != null) {
     this.disp = this.details.displayName
      } else {
        this.disp = ''
      }
    }, 0.5)

  }
  adminpage() {
    this.router.navigateByUrl('/admin/adminpage')
  }
  homepage() {
    this.router.navigateByUrl('/nurse/dashboard') 
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
