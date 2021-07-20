import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(private modal: ModalController) { }

  ngOnInit() {
  }
  login() {
  
    this.modal.create({
     component: LoginPage,
     animated: true,
     mode: 'md',
     backdropDismiss: false,
     cssClass: 'login-modal',
   }).then((p) => {
  return p.present();
   }).catch(err => {
     console.log(err)
   })

   // return await modal.present();
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
