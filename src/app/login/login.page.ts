import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
display: string
loginForm: FormGroup
  constructor(private alertCtrl: AlertController, private loadingCtrl: LoadingController, private auth: AuthService, private router: Router, private modal: ModalController, private afauth: AngularFireAuth) {
   }
  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ])
    }) 
  }
  login (email, password) 
  { 
    this.loadingCtrl.create({
      message: 'Please Wait Logging In...'
    }).then(el => {
      el.present()
      this.auth.SignIn(email, password).then((res) => {    
        setTimeout(() => {
          if (res.user) {
            sessionStorage.setItem('user', JSON.stringify(res.user))
            JSON.parse(sessionStorage.getItem('user'))
            if (res.user.displayName == 'admin') 
            { 
        this.router.navigateByUrl('/admin/adminpage/createschedule')
            } else if (res.user.displayName == 'nurse') 
            {
              this.router.navigateByUrl('/nurse/home')
  
            } else {
              sessionStorage.setItem('user', null)
               JSON.parse(sessionStorage.getItem('user'))            
            }
          }      
            el.dismiss()
            this.dismiss()
            this.loginForm.reset()
          }, 3000)
      }).catch(err => {
        
        this.alertCtrl.create({
          header: "Error",
          message: err,
          buttons: [
            {
              text: 'OK',
              role: 'cancel'  
            }
          ]
        }).then(error => {
          setTimeout(() => {
            error.present()
            el.dismiss()
          }, 3000)
        })

      })
    })
    
  }
  dismiss() {
    this.modal.dismiss()
    
  }
   

}
