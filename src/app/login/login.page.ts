import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
display: string
loginForm: FormGroup
  constructor(private loadingCtrl: LoadingController, private auth: AuthService, private router: Router, private modal: ModalController, private afauth: AngularFireAuth) {
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
            var obj = {
              displayName: res.user.displayName,
              emailverified: res.user.emailVerified
            }
            if (res.user) {
              localStorage.setItem('user', JSON.stringify(res.user))
              JSON.parse(localStorage.getItem('user'))
              if (res.user.displayName == 'admin') 
              { 
          this.router.navigateByUrl('/admin/adminpage')
              } else if (res.user.displayName == 'nurse') 
              {
                this.router.navigateByUrl('/nurse/home')
    
              } else {
                localStorage.setItem('user', null)
                 JSON.parse(localStorage.getItem('user'))            
              }
            }
            el.dismiss()
            this.dismiss()
          }, 3000)
      }).catch(err => {
        

      })
    })
    
  }
  async dismiss() {
    await this.modal.dismiss();
    
  }
   

}
